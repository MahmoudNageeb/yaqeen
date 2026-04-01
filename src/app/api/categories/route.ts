export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Category } from '@/lib/models'
import { requireAdmin } from '@/lib/auth'

async function _GET() {
  await connectDB()
  const cats = await Category.find().sort({ _id: 1 })
  return NextResponse.json(cats.map(c => ({ id: c._id, name_ar: c.name_ar, name_en: c.name_en, icon: c.icon, created_at: c.createdAt })))
}

async function _POST(req: Request) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { name_ar, name_en, icon } = await req.json()
  if (!name_ar || !name_en) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  const cat = await Category.create({ name_ar, name_en, icon: icon || 'fa-tag' })
  return NextResponse.json({ id: cat._id, name_ar: cat.name_ar, name_en: cat.name_en, icon: cat.icon })
}

export const GET = apiHandler(_GET)

export const POST = apiHandler(_POST)
