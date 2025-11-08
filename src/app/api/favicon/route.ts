import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const faviconSetting = await db.setting.findUnique({
      where: { key: 'faviconUrl' }
    })

    if (faviconSetting && faviconSetting.value) {
      return NextResponse.json({ 
        faviconUrl: faviconSetting.value,
        success: true 
      })
    }

    // Return default favicon if not set
    return NextResponse.json({ 
      faviconUrl: '/favicon.ico',
      success: true 
    })
  } catch (error) {
    console.error('Error fetching favicon:', error)
    // Return default favicon on error
    return NextResponse.json({ 
      faviconUrl: '/favicon.ico',
      success: false 
    })
  }
}
