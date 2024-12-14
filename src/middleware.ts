/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextResponse, userAgent} from 'next/server'
import type {NextRequest} from 'next/server'

const defaultLocale = 'en'
const locales = ['en', 'vi']
const protectedPaths = [
  '/signup/mobileWalletOption',
  '/signup/paymentPicker',
  '/signup/planform',
  // '/signup/regform',
  '/address-book',
  '/watch',
  '/genre',
  '/my-list',
  '/search',
  '/account',
  '/logout',
  // '/refresh-token',
]

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl
  const pathname = nextUrl.pathname

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // Redirect to login if accessing protected paths without a refresh token
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  )
  if (isProtectedPath && !refreshToken) {
    const url = new URL('/login', request.url)
    url.searchParams.set('clearStorage', 'true')
    return NextResponse.redirect(url)
  }

  // Redirect to home if trying to access login while already logged in
  if (pathname.startsWith('/login') && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to refresh-token if access token is missing but refresh token is present
  if (isProtectedPath && !accessToken && refreshToken) {
    const url = new URL('/refresh-token', request.url)
    url.searchParams.set('refreshToken', refreshToken)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect to home if search query `q` is missing
  if (pathname === '/search') {
    const queryParam = nextUrl.searchParams.get('q')
    if (!queryParam) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Add viewport info based on user agent
  const {device} = userAgent(request)
  const viewport =
    device.type === 'mobile'
      ? 'mobile'
      : device.type === 'tablet'
        ? 'tablet'
        : 'desktop'
  nextUrl.searchParams.set('viewport', viewport)
  nextUrl.searchParams.set('pathname', pathname)

  // Remove default locale prefix if present
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? '/' : '',
        ),
        request.url,
      ),
    )
  }

  // Rewrite missing locale in the path
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
    newUrl.search = nextUrl.searchParams.toString()
    return NextResponse.rewrite(newUrl)
  }

  // Final rewrite with updated search parameters
  const newUrl = new URL(`${pathname}`, request.url)
  newUrl.search = nextUrl.searchParams.toString()
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|icons|favicon.ico).*)'],
}
