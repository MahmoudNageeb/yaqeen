export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Coupon } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

async function _GET(req: Request) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const coupons = await Coupon.find().sort({ createdAt: -1 })
  return NextResponse.json(coupons.map(c => {
    const obj = c.toJSON()
    return {
      id: obj._id, code: obj.code,
      discount_type: obj.discount_type, discount_value: obj.discount_value,
      min_order: obj.min_order, max_uses: obj.max_uses, used_count: obj.used_count,
      expires_at: obj.expires_at, is_active: obj.is_active,
      created_at: obj.createdAt,
    }
  }))
}

async function _POST(req: Request) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const b = await req.json()
  if (!b.code || !b.discount_value) {
    return NextResponse.json({ error: 'Code and discount value required' }, { status: 400 })
  }

  const exists = await Coupon.findOne({ code: b.code.toUpperCase().trim() })
  if (exists) return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 })

  const coupon = await Coupon.create({
    code: b.code.toUpperCase().trim(),
    discount_type: b.discount_type || 'percentage',
    discount_value: +b.discount_value,
    min_order: +b.min_order || 0,
    max_uses: +b.max_uses || 0,
    expires_at: b.expires_at || null,
    is_active: b.is_active !== false,
  })

  return NextResponse.json({ message: 'Coupon created', id: coupon._id })
}

export const GET = apiHandler(_GET)
export const POST = apiHandler(_POST)
