// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const session: any = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

   if (request.nextUrl.pathname.startsWith('/')) {


    if (!session) {
        const requestedPage = request.nextUrl.pathname;
        const url = request.nextUrl.clone()

        url.pathname = '/auth/login';
        url.search = `p=${requestedPage}`;

        return NextResponse.redirect(url)

    }
   }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/product/:path*', '/category/:path*', '/search/:path*'],
}