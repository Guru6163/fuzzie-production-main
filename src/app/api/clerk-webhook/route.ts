import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, email_addresses, first_name, image_url } = body?.data

    const email = email_addresses[0]?.email_address
    console.log('✅', body)

    const existingUser = await db.user.findUnique({
      where: {
        email, // check if the email already exists
      },
    });

    if (existingUser) {
      await db.user.update({
        where: { email },
        data: {
          clerkId: id,
          name: first_name,
          profileImage: image_url,
        },
      });
    } else {
      await db.user.create({
        data: {
          clerkId: id,
          email,
          name: first_name || '',
          profileImage: image_url || '',
        },
      });
    }

    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('Error updating database:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  }
}
