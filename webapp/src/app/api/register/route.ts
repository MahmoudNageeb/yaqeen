export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword } from '@/lib/auth'

async function _POST(req: Request) {
  await connectDB()
  const { name, email, password } = await req.json()
  if (!name || !email || !password) return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  const existing = await User.findOne({ email })
  if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
  await User.create({ name, email, password: hashPassword(password) })
  return NextResponse.json({ message: 'Account created' })
}

export const POST = apiHandler(_POST)
