/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/layout/header/Header'
import {cookies} from 'next/headers'
import acountApiRequest from '@/apiRequest/account'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {redirect} from 'next/navigation'
import getDictionary from '@/app/dictionaries'
import Footer from '@/layout/footer/Footer'
export const dynamic = 'force-dynamic'
import {Suspense} from 'react'

export default async function DefaultLayout({
  children,
  params,
}: {
  params: {lang: string}
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  // try {
  // Nếu không có token, chuyển hướng về login trước khi gọi API
  if (!accesstoken) {
    return redirect('/login')
  }
  const [resAccount, t] = await Promise.all([
    acountApiRequest.Sme(accesstoken),
    getDictionary(params.lang),
  ])
  const dataAcount = resAccount.payload?.data
  if (!dataAcount?.subscriptions_id) {
    return redirect('/signup/planform')
  }
  return (
      <Header
        profile={dataAcount}
        lang={params?.lang}
        t={t}
      />
      <main className='relative'>{children}</main>
      <Footer t={t} />
  )
}
