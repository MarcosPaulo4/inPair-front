import { decodeJwt } from "jose";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";


const publicRoutes = [/^\/[a-z-]+\/signIn$/, /^\/[a-z-]+\/register$/];

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = decodeJwt(token);
    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch {
    return true;
  }
};

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = intlMiddleware(request) as NextResponse;

  const localeMatch = pathname.match(/^\/([a-z-]+)\b/);
  const locale = localeMatch?.[1] ?? routing.defaultLocale;

  const publicRoute = publicRoutes.some((regex) => regex.test(pathname));
  const token = request.cookies.get("token")?.value;
  const expired = token ? isTokenExpired(token) : true;

  if (expired && publicRoute) return response;

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/signIn`;
    return NextResponse.redirect(redirectUrl);
  }

  if (token && expired && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/signIn`;
    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/Home`;
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: '/((?!api|_next|trpc|.*\\..*).*)',
};
