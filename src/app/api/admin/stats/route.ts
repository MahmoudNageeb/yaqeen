export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Product, User, Order } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

async function _GET(req: Request) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const [productCount, userCount, orders] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
    Order.find().sort({ createdAt: -1 }).populate('user_id', 'name email'),
  ])

  const products = await Product.find()

  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total || 0), 0)

  const statusCounts: any = { pending: 0, processing: 0, shipped: 0, completed: 0, cancelled: 0 }
  orders.forEach(o => { if (statusCounts[o.status] !== undefined) statusCounts[o.status]++ })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayOrders = orders.filter(o => new Date(o.createdAt) >= today)
  const todayRevenue = todayOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total || 0), 0)

  // Low stock & out of stock with product details
  let lowStock = 0, outOfStock = 0
  const lowStockProducts: any[] = []
  const outOfStockProducts: any[] = []
  for (const p of products) {
    const total = (p.variants || []).reduce((s: number, v: any) => s + (v.stock || 0), 0)
    const prodInfo = { id: p._id, title_ar: p.title_ar, title_en: p.title_en, price: p.price, product_img: p.product_img, stock: total, category: p.category }
    if (total === 0) { outOfStock++; outOfStockProducts.push(prodInfo) }
    else if (total <= 5) { lowStock++; lowStockProducts.push(prodInfo) }
  }

  // Top selling products
  const productSales = new Map<string, { sold: number; product: any }>()
  for (const o of orders) {
    if (o.status === 'cancelled') continue
    for (const item of o.items) {
      const pid = item.product_id?.toString()
      if (!pid) continue
      const existing = productSales.get(pid)
      if (existing) {
        existing.sold += item.quantity
      } else {
        productSales.set(pid, { sold: item.quantity, product: null })
      }
    }
  }
  // Fill product data
  for (const p of products) {
    const entry = productSales.get(p._id.toString())
    if (entry) entry.product = p
  }
  const topProducts = Array.from(productSales.values())
    .filter(e => e.product)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5)
    .map(e => ({
      id: e.product._id,
      title_ar: e.product.title_ar,
      title_en: e.product.title_en,
      price: e.product.price,
      product_img: e.product.product_img,
      sold: e.sold,
    }))

  const recentOrders = orders.slice(0, 5).map(o => {
    const obj = o.toJSON()
    const user = obj.user_id as any
    return {
      id: obj._id, full_name: obj.full_name, phone: obj.phone,
      total: obj.total, status: obj.status,
      user_name: user?.name || '', user_email: user?.email || '',
      created_at: obj.createdAt,
    }
  })

  return NextResponse.json({
    products: productCount, users: userCount, orders: orders.length,
    revenue, ...statusCounts,
    todayOrders: todayOrders.length, todayRevenue,
    lowStock, outOfStock,
    lowStockProducts, outOfStockProducts,
    recentOrders, topProducts,
  })
}

export const GET = apiHandler(_GET)
