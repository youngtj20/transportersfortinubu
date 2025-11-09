import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth-utils'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const category = searchParams.get('category')
    const slug = searchParams.get('slug')

    const where: any = {}
    
    if (published === 'true') {
      where.published = true
    } else if (published === 'false') {
      where.published = false
    }
    
    if (category) {
      where.category = category
    }

    if (slug) {
      where.slug = slug
    }

    const posts = await db.post.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest()
    
    console.log('POST Session:', JSON.stringify(session, null, 2))
    console.log('POST User:', JSON.stringify(session?.user, null, 2))
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized - No session' }, { status: 401 })
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Not admin' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, content, excerpt, featuredImage, published, category, tags, galleryImages } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    // Check if slug already exists
    const existingPost = await db.post.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json({ error: 'Post with this slug already exists' }, { status: 400 })
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        published: published || false,
        category,
        tags,
        galleryImages: galleryImages ? JSON.stringify(galleryImages) : null,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}