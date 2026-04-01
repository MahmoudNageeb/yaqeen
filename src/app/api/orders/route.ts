export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Order, CartItem, Product } from '@/lib/models'
import { getAuth, requireAdmin } from '@/lib/auth'

async function _GET(req: Request) {
  await connectDB()
  const auth = getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (auth.role === 'admin') {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user_id', 'name email')
    return NextResponse.json(orders.map(o => {
      const obj = o.toJSON()
      const user = obj.user_id as any
      return {
        id: obj._id, ...obj,
        user_name: user?.name || '', user_email: user?.email || '',
        created_at: obj.createdAt,
      }
    }))
  }
  
  const orders = await Order.find({ user_id: auth.id }).sort({ createdAt: -1 })
  return NextResponse.json(orders.map(o => {
    const obj = o.toJSON()
    return { id: obj._id, ...obj, created_at: obj.createdAt }
  }))
}

async function _POST(req: Request) {
  await connectDB()
  const auth = getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const b = await req.json()
  if (!b.full_name || !b.phone || !b.governorate || !b.city || !b.address) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }
  const phoneClean = b.phone.replace(/\D/g, '')
  if (phoneClean.length !== 11) {
    return NextResponse.json({ error: 'Phone must be 11 digits' }, { status: 400 })
  }

  const cartItems = await CartItem.find({ user_id: auth.id }).populate('product_id')
  if (!cartItems.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

  const items: any[] = []
  let total = 0

  for (const ci of cartItems) {
    const prod = ci.product_id as any
    if (!prod) continue

    // Check variant stock
    const variant = prod.variants?.find((v: any) => {
      const sMatch = !ci.selected_size || v.size === ci.selected_size
      const cMatch = !ci.selected_color || v.color_name === ci.selected_color
      return sMatch && cMatch
    })

    if (variant && variant.stock < ci.quantity) {
      return NextResponse.json({ error: `Not enough stock for ${prod.title_en}` }, { status: 400 })
    }

    items.push({
      product_id: prod._id,
      quantity: ci.quantity,
      price: prod.price,
      selected_size: ci.selected_size || '',
      selected_color: ci.selected_color || '',
      title_ar: prod.title_ar,
      title_en: prod.title_en,
      product_img: prod.product_img,
    })
    total += prod.price * ci.quantity
  }

  const order = await Order.create({
    user_id: auth.id,
    full_name: b.full_name,
    phone: b.phone,
    phone2: b.phone2 || '',
    email: b.email || '',
    governorate: b.governorate,
    city: b.city,
    address: b.address,
    notes: b.notes || '',
    total,
    items,
  })

  // Deduct variant stock
  for (const ci of cartItems) {
    const prod = ci.product_id as any
    if (!prod) continue
    await Product.updateOne(
      { _id: prod._id, 'variants.size': ci.selected_size || '', 'variants.color_name': ci.selected_color || '' },
      { $inc: { 'variants.$.stock': -ci.quantity } }
    )
  }

  // Clear cart
  await CartItem.deleteMany({ user_id: auth.id })

  return NextResponse.json({ message: 'Order placed', orderId: order._id })
}

export const GET = apiHandler(_GET)

export const POST = apiHandler(_POST)
