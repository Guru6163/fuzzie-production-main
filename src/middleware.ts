import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
  '/api/payment/success',
])

const isIgnoredRoute = createRouteMatcher([
 '/api/clerk-webhook',
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait',
])

export default clerkMiddleware(async (auth, req) => {
  if (isIgnoredRoute(req)) {
    return
  }

  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Exclude ignored routes from middleware
    '/((?!.*\\..*|_next|api/clerk-webhook|api/auth/callback/discord|api/auth/callback/notion|api/auth/callback/slack|api/flow|api/cron/wait).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}

