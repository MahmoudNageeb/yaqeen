export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { requireAdmin } from '@/lib/auth'
import crypto from 'crypto'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'djfn7fkp0'
const API_KEY = process.env.CLOUDINARY_API_KEY || '564481979951638'
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'j0Z2K8D-I6lATbwvOOCEN1iAf8o'

function generateSignature(params: Record<string, string>): string {
  // Sort params alphabetically and create signing string
  const sortedKeys = Object.keys(params).sort()
  const signStr = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + API_SECRET
  return crypto.createHash('sha1').update(signStr).digest('hex')
}

async function uploadToCloudinary(base64Data: string): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const timestamp = Math.round(Date.now() / 1000).toString()

  const paramsToSign: Record<string, string> = {
    folder: 'yaqeen',
    timestamp,
  }

  const signature = generateSignature(paramsToSign)

  const formData = new URLSearchParams()
  formData.append('file', base64Data)
  formData.append('timestamp', timestamp)
  formData.append('api_key', API_KEY)
  formData.append('signature', signature)
  formData.append('folder', 'yaqeen')

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  const result = await res.json()

  if (!res.ok || !result.secure_url) {
    console.error('Cloudinary error:', JSON.stringify(result))
    throw new Error(result.error?.message || 'Upload to Cloudinary failed')
  }

  return result.secure_url
}

async function _POST(req: Request) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { image } = await req.json()
  if (!image) return NextResponse.json({ error: 'No image' }, { status: 400 })

  // If it's already a URL, return it
  if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
    return NextResponse.json({ url: image })
  }

  // If it's a local static path, return it
  if (typeof image === 'string' && image.startsWith('/')) {
    return NextResponse.json({ url: image })
  }

  // Upload base64 to Cloudinary
  const cloudinaryUrl = await uploadToCloudinary(image)
  return NextResponse.json({ url: cloudinaryUrl })
}

export const POST = apiHandler(_POST)
