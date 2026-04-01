export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'

// Legacy image endpoint - now images are stored on Cloudinary
// This route redirects to Cloudinary or serves legacy base64 images
async function _GET(req: Request, { params }: { params: { id: string } }) {
  // For legacy support, try to load from MongoDB if needed
  try {
    const { connectDB } = await import('@/lib/db')
    const { ImageModel } = await import('@/lib/models')
    await connectDB()
    const img = await ImageModel.findById(params.id)
    if (!img) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const data = img.data as string
    
    // If it's a URL, redirect
    if (data.startsWith('http')) {
      return NextResponse.redirect(data)
    }
    
    // Parse data URI: data:image/jpeg;base64,...
    const match = data.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) return NextResponse.json({ error: 'Invalid image data' }, { status: 500 })

    const mimeType = match[1]
    const base64Data = match[2]
    const buffer = Buffer.from(base64Data, 'base64')

    return new Response(buffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export const GET = apiHandler(_GET)
