import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth-utils'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const gallery = await db.eventGallery.findUnique({
      where: { id },
    })

    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 })
    }

    // Parse images
    const galleryResponse = {
      ...gallery,
      images: JSON.parse(gallery.images),
    }

    return NextResponse.json(galleryResponse)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Check if slug already exists for another gallery
    const existingGallery = await db.eventGallery.findFirst({
      where: { 
        slug,
        id: { not: id }
      }
    })

    if (existingGallery) {
      return NextResponse.json({ error: 'Gallery with this slug already exists' }, { status: 400 })
    }

    const gallery = await db.eventGallery.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        location,
        eventDate: eventDate ? new Date(eventDate) : null,
        images: JSON.stringify(images),
        published,
      },
    })

    // Parse images back to array for response
    const galleryResponse = {
      ...gallery,
      images: JSON.parse(gallery.images),
    }

    return NextResponse.json(galleryResponse)
  } catch (error) {
    console.error('Error updating gallery:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionFromRequest()
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.eventGallery.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Gallery deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
