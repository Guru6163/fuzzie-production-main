import { google } from 'googleapis'
import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/clerk-sdk-node'

import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'

export async function GET() {
  console.log('GET /api/drive-activity called')

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  )

  const { userId } = await auth()
  console.log('Authenticated user ID:', userId)

  if (!userId) {
    console.error('User ID not found')
    return NextResponse.json({ message: 'User not found' })
  }

  try {
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
      userId,
      'oauth_google'
    )
    console.log('Clerk OAuth token response:', clerkResponse)

    const accessToken = clerkResponse.data[0]?.token
    if (!accessToken) {
      throw new Error('Access token not found')
    }

    oauth2Client.setCredentials({
      access_token: accessToken,
    })

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    })

    const channelId = uuidv4()
    console.log('Generated channel ID:', channelId)

    const startPageTokenRes = await drive.changes.getStartPageToken({})
    console.log('Start page token response:', startPageTokenRes.data)

    const startPageToken = startPageTokenRes.data.startPageToken
    if (!startPageToken) {
      throw new Error('startPageToken is unexpectedly null')
    }

    const watchRequest = {
      pageToken: startPageToken,
      supportsAllDrives: true,
      supportsTeamDrives: true,
      requestBody: {
        id: channelId,
        type: 'web_hook',
        address: `${process.env.NGROK_URI}/api/drive-activity/notification`,
        kind: 'api#channel',
      },
    }

    console.log('Sending watch request with payload:', watchRequest)

    const listener = await drive.changes.watch(watchRequest)
    console.log('Watch response:', listener)

    if (listener.status === 200) {
      const channelStored = await db.user.updateMany({
        where: {
          clerkId: userId,
        },
        data: {
          googleResourceId: listener.data.resourceId,
        },
      })
      console.log('DB update response:', channelStored)

      if (channelStored) {
        return new NextResponse('Listening to changes...')
      } else {
        console.warn('DB update did not modify any records')
      }
    } else {
      console.error('Listener creation failed:', listener.statusText)
    }

    return new NextResponse('Oops! something went wrong, try again')
  } catch (error) {
    console.error('Error during Drive webhook setup:', error)
    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
