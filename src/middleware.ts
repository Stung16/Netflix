/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextResponse, userAgent} from 'next/server'
import type {NextRequest} from 'next/server'
const defaultLocale = 'en'
const locales = ['en', 'vi']
const protectedPaths = [
  '/signup/mobileWalletOption',
  '/signup/paymentPicker',
  '/signup/planform',
  '/signup/regform',
  '/address-book',
  '/watch',
  '/genre',
  '/my-list',
  '/search',
  '/account',
]

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl
  const pathname = nextUrl.pathname

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // Nếu chưa đăng nhập về login
  if (
    !pathname.startsWith('/login') &&
    !refreshToken &&
    !pathname.startsWith('/signup')
  ) {
    const url = new URL('/login', request.url)
    url.searchParams.set('clearStorage', 'true' as string)
    return NextResponse.redirect(url)
  }
  // neeus dawng nhap r k cho vao logn
  if (pathname.startsWith('/login') && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  // ddawng nhap r nhuwn token heets hanj
  if (
    !accessToken &&
    refreshToken &&
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/logout') &&
    !pathname.startsWith('/refresh-token')
  ) {
    const url = new URL('/refresh-token', request.url)
    url.searchParams.set('refreshToken', refreshToken as string)
    url.searchParams.set('redirect', pathname as string)
    return NextResponse.redirect(url)
  }
  // đã xác thực
  if (pathname === '/search') {
    const queryParam = nextUrl.searchParams.get('q')
    if (!queryParam) {
      // Redirect về trang chủ nếu `q` không có hoặc rỗng
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  const {device} = userAgent(request)
  const viewport =
    device.type === 'mobile'
      ? 'mobile'
      : device.type === 'tablet'
        ? 'tablet'
        : 'desktop'
  nextUrl.searchParams.set('viewport', viewport)
  nextUrl.searchParams.set('pathname', pathname)

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

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    if (nextUrl.searchParams) {
      const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
      newUrl.search = nextUrl.searchParams.toString()
      return NextResponse.rewrite(newUrl)
    }

    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    )
  }
  const newUrl = new URL(`${pathname}`, request.url)
  newUrl.search = nextUrl.searchParams.toString()
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|icons|favicon.ico).*)'],
}
