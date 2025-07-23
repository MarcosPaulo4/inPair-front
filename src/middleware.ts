import { decodeJwt } from "jose";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: /^\/[a-z-]+\/signIn$/, whenAuthenticated: 'redirect' },
  { path:/^\/[a-z-]+\/signIn$/, whenAuthenticated: 'redirect' }
] as const;

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
  const path = request.nextUrl.pathname;
  const localeMatch = path.match(/^\/([a-z-]+)\b/)
  let locale = localeMatch ? localeMatch[1] : null;

  if (!locale) {
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang?.startsWith('en')) {
      locale = 'en';
    } else {
      locale = 'pt-br';
    }
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}${path}`;
    return NextResponse.redirect(redirectUrl);
  }
  
  const publicRoute = publicRoutes.find(route => route.path.test(path));
  const authToken = request.cookies.get('token')?.value
  const isExpired = authToken ? isTokenExpired(authToken) : true;

  if (isExpired && publicRoute) {
    return NextResponse.next();
  }

  if (authToken && isExpired && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/signIn`;
    return NextResponse.redirect(redirectUrl);
  }

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
     redirectUrl.pathname = `/${locale}/signIn`

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/${locale}/Home`

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}