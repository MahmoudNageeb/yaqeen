export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { getAuth } from '@/lib/auth'

async function _GET(req: Request) {
  await connectDB()
  const p = getAuth(req)
  if (!p) return NextResponse.json({ user: null })
  const user = await User.findById(p.id).select('name email role createdAt')
  if (!user) return NextResponse.json({ user: null })
  return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, created_at: user.createdAt } })
}

export const GET = apiHandler(_GET)
