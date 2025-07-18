//for clark authentication
import {clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async(auth, req) => {
  const { userId } = await auth();
  
  // Check if the request is for a protected route
  if (isProtectedRoute(req)) {
    // If the user is not authenticated, redirect manually
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};