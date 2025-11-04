import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const page = await db.page.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...page,
      slides: page.slides ? JSON.parse(page.slides) : [],
      sections: page.sections ? JSON.parse(page.sections) : [],
    })
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if slug already exists (excluding current page)
    const existingPage = await db.page.findFirst({
      where: {
        slug,
        NOT: { id: params.id }
      }
    })

    if (existingPage) {
      return NextResponse.json({ error: 'Page with this slug already exists' }, { status: 400 })
    }

    const page = await db.page.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        content,
        metaTitle,
        metaDescription,
        featuredImage,
        published,
        pageType: pageType || 'static',
        template: template || 'default',
        slides: slides ? JSON.stringify(slides) : null,
        sections: sections ? JSON.stringify(sections) : null,
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
    })
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.page.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
