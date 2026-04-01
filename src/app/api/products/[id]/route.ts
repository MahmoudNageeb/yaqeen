export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Product } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'
import { transformProduct, parseVariants } from '@/lib/helpers'

async function _GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const product = await Product.findById(params.id)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(transformProduct(product))
}

async function _PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const b = await req.json()

  const existing = await Product.findById(params.id)
  const existingVariantMap = new Map<string, number>()
  if (existing) {
    for (const v of (existing.variants || [])) {
      const key = `${v.size || ''}|${v.color_name || ''}`
      existingVariantMap.set(key, v.stock || 0)
    }
  }

  const { variants, gallery, specifications } = parseVariants(b, existingVariantMap)

  await Product.findByIdAndUpdate(params.id, {
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
  return NextResponse.json({ message: 'Product updated' })
}

async function _DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await Product.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'Product deleted' })
}

export const GET = apiHandler(_GET)

export const PUT = apiHandler(_PUT)

export const DELETE = apiHandler(_DELETE)
