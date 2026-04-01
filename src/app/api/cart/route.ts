export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { CartItem } from '@/lib/models'
import { getAuth } from '@/lib/auth'

async function _GET(req: Request) {
  await connectDB()
  const p = getAuth(req); if (!p) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await CartItem.find({ user_id: p.id }).populate('product_id')
  return NextResponse.json(items.map(ci => {
    const prod = ci.product_id as any
    if (!prod) return null
    return {
      id: ci._id, quantity: ci.quantity, product_id: prod._id,
      selected_size: ci.selected_size, selected_color: ci.selected_color,
      title_ar: prod.title_ar, title_en: prod.title_en,
      price: prod.price, product_img: prod.product_img,
    }
  }).filter(Boolean))
}

async function _POST(req: Request) {
  await connectDB()
  const p = getAuth(req); if (!p) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { product_id, quantity, selected_size, selected_color } = await req.json()
  const sz = selected_size || '', clr = selected_color || ''
  const existing = await CartItem.findOne({ user_id: p.id, product_id, selected_size: sz, selected_color: clr })
  if (existing) {
    existing.quantity += (quantity || 1)
    await existing.save()
  } else {
    await CartItem.create({ user_id: p.id, product_id, quantity: quantity || 1, selected_size: sz, selected_color: clr })
  }
  return NextResponse.json({ message: 'Added' })
}

async function _DELETE(req: Request) {
  await connectDB()
  const p = getAuth(req); if (!p) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await CartItem.deleteMany({ user_id: p.id })
  return NextResponse.json({ message: 'Cart cleared' })
}

export const GET = apiHandler(_GET)

export const POST = apiHandler(_POST)

export const DELETE = apiHandler(_DELETE)
