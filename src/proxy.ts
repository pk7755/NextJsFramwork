import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



 
// This function can be marked `async` if using `await` inside
export async function proxy(req: NextRequest) {

    const {pathname} = req.nextUrl

    const publicRoutes = [
        "/login",
        "/register",
        "/api/auth",
        "/favicon.ico",
        "_next"
    ]

    if(publicRoutes.some(path=>pathname.startsWith(path))) {
         return NextResponse.next()
    }

    const token = await getToken({req, secret:process.env.NEXT_AUTH_SECRET})

    if(!token) {
        const loginUrl = new URL("/login", req.url)
        loginUrl.searchParams.set("callbackUrl", req.url)
        return NextResponse.redirect(loginUrl)
    }
}

export const config = {
  matcher: 
    // Match all pathnames except for:
    // - api routes, static files, or internal nextjs paths
    '/((?!api|_next/static|_next/image|favicon.ico|node_modules|.*\\.png$).*)'
};
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
// export const config = {
//   matcher: '/about/:path*',
// }