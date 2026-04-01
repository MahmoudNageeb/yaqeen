export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { verifyPassword, createToken } from '@/lib/auth'

async function _POST(req: Request) {
  await connectDB()
  const { email, password } = await req.json()
  const user = await User.findOne({ email })
  if (!user || !verifyPassword(password, user.password)) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const token = createToken({ id: user._id.toString(), email: user.email, name: user.name, role: user.role })
  return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}

export const POST = apiHandler(_POST)
