import { db } from '../src/lib/db'
import bcrypt from 'bcryptjs'

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await db.user.findUnique({
      where: { email: 'admin@tinubu2027.com' }
    })

    if (existingAdmin) {
      console.log('Admin user already exists')
      console.log('Email: admin@tinubu2027.com')
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await db.user.create({
      data: {
        email: 'admin@tinubu2027.com',
        name: 'Administrator',
        password: hashedPassword,
        role: 'admin'
      }
    })

    console.log('Admin user created successfully!')
    console.log('Email: admin@tinubu2027.com')
    console.log('Password: admin123')
    console.log('Please change the password after first login')
    
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await db.$disconnect()
  }
}

createAdminUser()