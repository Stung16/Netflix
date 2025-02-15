import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {Cormorant_Garamond} from 'next/font/google'
import '../globals.css'
import {Toaster} from '@/components/ui/sonner'
import {defineCurrency} from '@/lib/constants'
import RefreshToken from '@/components/RefreshToken'

const Sackers = localFont({
  src: [
    {
      path: '../fonts/Sackers_VH/sackersgothicstd-heavy-VH.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Sackers_VH/sackersgothicstd-medium-VH.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Sackers_Gothic_Font/sackersgothicstd-light.otf',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-scakers',
  preload: true,
  style: 'normal',
})
const cormorant = Cormorant_Garamond({
  weight: ['500', '600', '700'],
  subsets: ['vietnamese'],
  variable: '--font-cormorant',
  style: 'normal',
  display: 'swap',
})
const icon = localFont({
  src: [
    {
      path: '../fonts/icon/nf-icon-v1-93.woff',
      weight: 'normal',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-nf-icon',
})
const helvetica = localFont({
  src: [
    {
      path: '../fonts/helvetica/HelveticaNeue-UltraLight.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/helvetica/HelveticaNeue-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/helvetica/HelveticaNeue-Normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/helvetica/HelveticaNeue-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/helvetica/HelveticaNeue-CondensedBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/helvetica/HelveticaNeue-CondensedBlack.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica',
})
const netflix = localFont({
  src: [
    {
      path: '../fonts/netflix/NetflixSans_W_Rg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/netflix/NetflixSans_W_Md.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/netflix/NetflixSans_W_Bd.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/netflix/NetflixSans_W_Blk.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-netflix',
})

export const metadata: Metadata = {
  title: 'Netflix',
  description:
    'Watch unlimited movies, TV shows, and exclusive content on Netflix. Enjoy thousands of titles in HD quality with no ads, anytime, anywhere.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}
export async function generateStaticParams() {
  return defineCurrency.map((currency) => ({currency: currency.code}))
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
    >
      <head>
        <link
          rel='icon'
          href='/nficon2016.ico'
          sizes='32x32'
        />
      </head>
      {/* <Head>
      </Head> */}
      <body
        className={`${icon.variable} ${netflix.variable} ${Sackers.variable} ${netflix.className} ${cormorant.variable} ${helvetica.variable} antialiased bg-[#141414]`}
      >
        {children}
        <RefreshToken />
        <Toaster richColors />
      </body>
    </html>
  )
}
