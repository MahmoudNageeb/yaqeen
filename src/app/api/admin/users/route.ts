export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

async function _GET(req: Request) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const users = await User.find().select('name email role createdAt').sort({ createdAt: -1 })
  return NextResponse.json(users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role, created_at: u.createdAt })))
}

export const GET = apiHandler(_GET)
