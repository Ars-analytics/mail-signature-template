import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'])

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Please upload a PNG, JPG, GIF, WebP, or SVG image' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'png'
    const blob = await put(`signature-logos/${crypto.randomUUID()}.${extension}`, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Logo upload failed:', error)
    return NextResponse.json({ error: 'Logo upload failed. Please try again.' }, { status: 500 })
  }
}
