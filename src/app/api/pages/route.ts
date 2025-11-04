import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const pages = await db.page.findMany({
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

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, content, metaTitle, metaDescription, featuredImage, published, pageType, template, slides, sections } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    // Check if slug already exists
    const existingPage = await db.page.findUnique({
      where: { slug }
    })

    if (existingPage) {
      return NextResponse.json({ error: 'Page with this slug already exists' }, { status: 400 })
    }

    const page = await db.page.create({
      data: {
        title,
        slug,
        content,
        metaTitle,
        metaDescription,
        featuredImage,
        published: published || false,
        pageType: pageType || 'static',
        template: template || 'default',
        slides: slides ? JSON.stringify(slides) : null,
        sections: sections ? JSON.stringify(sections) : null,
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

    return NextResponse.json({
      ...page,
      slides: page.slides ? JSON.parse(page.slides) : [],
      sections: page.sections ? JSON.parse(page.sections) : [],
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}