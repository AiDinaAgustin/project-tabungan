import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/request'

export function middleware(request: NextRequest) {
    const userId = request.cookies.get('user_id')?.value
    const { pathname } = request.nextUrl

    // Define public and protected routes
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
    const isPublicFile = pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api')

    // 1. If user is NOT logged in and trying to access a protected page
    if (!userId && !isAuthPage && !isPublicFile) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. If user IS logged in and trying to access login/register
    if (userId && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
