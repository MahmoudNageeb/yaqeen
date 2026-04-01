export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Product } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'
import { transformProduct, parseVariants } from '@/lib/helpers'

async function _GET(req: Request) {
  await connectDB()
  const url = new URL(req.url)
  const cat = url.searchParams.get('category')
  const feat = url.searchParams.get('featured')
  const search = url.searchParams.get('search')
  const filter: any = {}
  if (cat) filter.category = cat
  if (feat === '1') filter.featured = 1
  if (search) filter.$or = [
    { title_ar: { $regex: search, $options: 'i' } },
    { title_en: { $regex: search, $options: 'i' } }
  ]
  const products = await Product.find(filter).sort({ createdAt: -1 })
  return NextResponse.json(products.map(transformProduct))
}

async function _POST(req: Request) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const b = await req.json()
  const { variants, gallery, specifications } = parseVariants(b)
  
  const product = await Product.create({
    title_ar: b.title_ar || '', title_en: b.title_en || '',
    price: b.price || 0, old_price: b.old_price || null,
    description_ar: b.description_ar || '', description_en: b.description_en || '',
    details_ar: b.details_ar || '', details_en: b.details_en || '',
    category: b.category || 'general', brand: b.brand || '', sku: b.sku || '',
    featured: b.featured || 0, product_img: b.product_img || '',
    gallery, specifications,
    enable_sizes: b.enable_sizes || 0, enable_colors: b.enable_colors || 0,
    variants,
  })
  return NextResponse.json({ message: 'Product added', id: product._id })
}

export const GET = apiHandler(_GET)

export const POST = apiHandler(_POST)
