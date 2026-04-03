export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Coupon } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

async function _PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const b = await req.json()
  const coupon = await Coupon.findById(params.id)
  if (!coupon) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (b.code !== undefined) coupon.code = b.code.toUpperCase().trim()
  if (b.discount_type !== undefined) coupon.discount_type = b.discount_type
  if (b.discount_value !== undefined) coupon.discount_value = +b.discount_value
  if (b.min_order !== undefined) coupon.min_order = +b.min_order
  if (b.max_uses !== undefined) coupon.max_uses = +b.max_uses
  if (b.expires_at !== undefined) coupon.expires_at = b.expires_at || null
  if (b.is_active !== undefined) coupon.is_active = b.is_active

  await coupon.save()
  return NextResponse.json({ message: 'Coupon updated' })
}

async function _DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await Coupon.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'Coupon deleted' })
}

export const PUT = apiHandler(_PUT)
export const DELETE = apiHandler(_DELETE)
