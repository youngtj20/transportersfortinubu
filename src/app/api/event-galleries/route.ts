import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth-utils'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    const where: any = {}
    
    if (published === 'true') {
      where.published = true
    } else if (published === 'false') {
      where.published = false
    }

    const galleries = await db.eventGallery.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Parse images for each gallery
    const galleriesWithParsedImages = galleries.map(gallery => ({
      ...gallery,
      images: JSON.parse(gallery.images),
    }))

    return NextResponse.json(galleriesWithParsedImages)
  } catch (error) {
    console.error('Error fetching galleries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 })
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Not admin' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, description, location, eventDate, images, published } = body

    if (!title || !slug || !images || images.length === 0) {
      return NextResponse.json({ error: 'Title, slug, and at least one image are required' }, { status: 400 })
    }

    // Check if slug already exists
    const existingGallery = await db.eventGallery.findUnique({
      where: { slug }
    })

    if (existingGallery) {
      return NextResponse.json({ error: 'Gallery with this slug already exists' }, { status: 400 })
    }

    const gallery = await db.eventGallery.create({
      data: {
        title,
        slug,
        description,
        location,
        eventDate: eventDate ? new Date(eventDate) : null,
        images: JSON.stringify(images),
        published: published || false,
      },
    })

    // Parse images back to array for response
    const galleryResponse = {
      ...gallery,
      images: JSON.parse(gallery.images),
    }

    return NextResponse.json(galleryResponse, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
