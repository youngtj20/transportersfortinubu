import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// API route for handling movement member submissions
// Updated to fix form submission issues
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      fullName,
      gender,
      email,
      phoneNumber,
      stateOfOrigin,
      lga,
      modesOfTransport,
    } = body

    // Validation
    if (!fullName || !gender || !phoneNumber || !stateOfOrigin || !lga) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Additional validation for modesOfTransport
    if (!Array.isArray(modesOfTransport) || modesOfTransport.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one mode of transport' },
        { status: 400 }
      )
    }

    // Check for duplicate phone number
    const existingPhoneNumber = await (db as any).movementMember.findFirst({
      where: {
        phoneNumber: phoneNumber.trim(),
      },
    })

    if (existingPhoneNumber) {
      return NextResponse.json(
        { error: 'This phone number has already been registered. Please use a different phone number or contact support if you believe this is an error.' },
        { status: 409 }
      )
    }

    // Check for duplicate email (if email is provided)
    if (email && email.trim()) {
      const existingEmail = await (db as any).movementMember.findFirst({
        where: {
          email: email.trim().toLowerCase(),
        },
      })

      if (existingEmail) {
        return NextResponse.json(
          { error: 'This email address has already been registered. Please use a different email or contact support if you believe this is an error.' },
          { status: 409 }
        )
      }
    }

    // Create movement member
    const member = await (db as any).movementMember.create({
      data: {
        fullName,
        gender,
        email: email ? email.trim().toLowerCase() : null,
        phoneNumber: phoneNumber.trim(),
        stateOfOrigin,
        lga,
        modesOfTransport: JSON.stringify(modesOfTransport),
      },
    })

    return NextResponse.json(
      { success: true, member },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating movement member:', error)
    // Return more specific error message
    let errorMessage = 'Internal server error'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const members = await (db as any).movementMember.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(members)
  } catch (error: any) {
    console.error('Error fetching movement members:', error)
    // Return more specific error message
    let errorMessage = 'Internal server error'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}