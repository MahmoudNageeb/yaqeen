export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Coupon } from '@/lib/models'
import { getAuth } from '@/lib/auth'

async function _POST(req: Request) {
  await connectDB()
  const auth = getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { code, order_total } = await req.json()
  if (!code) return NextResponse.json({ error: 'Coupon code required' }, { status: 400 })

  const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() })
  if (!coupon) return NextResponse.json({ error: 'invalid_code' }, { status: 404 })

  if (!coupon.is_active) return NextResponse.json({ error: 'coupon_inactive' }, { status: 400 })

  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return NextResponse.json({ error: 'coupon_expired' }, { status: 400 })
  }

  if (coupon.max_uses > 0 && coupon.used_count >= coupon.max_uses) {
    return NextResponse.json({ error: 'coupon_maxed' }, { status: 400 })
  }

  if (coupon.min_order > 0 && order_total < coupon.min_order) {
    return NextResponse.json({ error: 'min_order_not_met', min_order: coupon.min_order }, { status: 400 })
  }

  let discount = 0
  if (coupon.discount_type === 'percentage') {
    discount = Math.round((order_total * coupon.discount_value) / 100)
  } else {
    discount = Math.min(coupon.discount_value, order_total)
  }

  return NextResponse.json({
    valid: true,
    code: coupon.code,
    discount_type: coupon.discount_type,
    discount_value: coupon.discount_value,
    discount_amount: discount,
    new_total: order_total - discount,
  })
}

export const POST = apiHandler(_POST)
