import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { cookies } from 'next/headers'

// Simple JWT decode function without external dependencies
function decodeJWT(token: string) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    // Decode the payload (second part)
    const payload = parts[1]
    const decoded = JSON.parse(
      Buffer.from(payload, 'base64').toString('utf-8')
    )
    return decoded
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

export async function getSessionFromRequest() {
  try {
    // Try the standard way first
    const session = await getServerSession(authOptions)
    console.log('getServerSession result:', session)
    if (session?.user) {
      console.log('Session found via getServerSession')
      return session
    }

    // If that doesn't work, try to get from cookies
    const cookieStore = await cookies()
    console.log('All cookies:', cookieStore.getAll())
    
    // Try multiple possible session token names
    const sessionToken = cookieStore.get('next-auth.session-token')?.value ||
                        cookieStore.get('__Secure-next-auth.session-token')?.value ||
                        cookieStore.get('auth-token')?.value

    if (!sessionToken) {
      console.log('No session token found in cookies')
      console.log('Available cookie names:', cookieStore.getAll().map(c => c.name))
      return null
    }

    console.log('Found session token in cookies, length:', sessionToken.length)
    
    // For JWT strategy, we can decode the token
    try {
      const decoded = decodeJWT(sessionToken)
      console.log('Decoded JWT:', decoded)
      if (!decoded) {
        console.log('Could not decode token')
        return null
      }

      const sessionData = {
        user: {
          id: decoded.sub || decoded.userId,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role || 'user',
        },
        expires: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : undefined,
      }
      console.log('Returning session:', sessionData)
      return sessionData
    } catch (e) {
      console.log('Could not decode token:', e)
      return null
    }
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}
