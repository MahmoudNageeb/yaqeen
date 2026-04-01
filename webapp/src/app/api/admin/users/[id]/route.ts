export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { User, CartItem } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

async function _DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const user = await User.findById(params.id)
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (user.role === 'admin') return NextResponse.json({ error: 'Cannot delete admin' }, { status: 400 })
  await CartItem.deleteMany({ user_id: params.id })
  await User.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'User deleted' })
}

export const DELETE = apiHandler(_DELETE)
