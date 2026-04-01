export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { CartItem } from '@/lib/models'
import { getAuth } from '@/lib/auth'

async function _PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const p = getAuth(req); if (!p) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { quantity } = await req.json()
  if (quantity < 1) {
    await CartItem.findOneAndDelete({ _id: params.id, user_id: p.id })
    return NextResponse.json({ message: 'Removed' })
  }
  await CartItem.findOneAndUpdate({ _id: params.id, user_id: p.id }, { quantity })
  return NextResponse.json({ message: 'Updated' })
}

async function _DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const p = getAuth(req); if (!p) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await CartItem.findOneAndDelete({ _id: params.id, user_id: p.id })
  return NextResponse.json({ message: 'Removed' })
}

export const PUT = apiHandler(_PUT)

export const DELETE = apiHandler(_DELETE)
