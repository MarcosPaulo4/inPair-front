import { decodeJwt } from "jose";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: '/signIn', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' }
] as const;


const REDIRECT_WHEN_NOT_AUTHENTICATED = '/signIn';

  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = decodeJwt(token)
      if (!exp) {
        return true
      }

      const now = Math.floor(Date.now() / 1000);
      return exp < now
    } catch {
      return true
    }
  }

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')?.value
  const isExpired = authToken ? isTokenExpired(authToken) : true;

  if (isExpired && publicRoute) {
    return NextResponse.next();
  }

  if (authToken && isExpired && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/Home'

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}