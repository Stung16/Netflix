/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/layout/header/Header'
import {cookies} from 'next/headers'
import acountApiRequest from '@/apiRequest/account'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {redirect} from 'next/navigation'
import getDictionary from '@/app/dictionaries'
import Footer from '@/layout/footer/Footer'

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
  const [resAccount, t] = await Promise.all([
    acountApiRequest.Sme(accesstoken),
    getDictionary(params.lang),
  ])
  const dataAcount = resAccount.payload?.data
  if (!dataAcount?.subscriptions_id) {
    redirect('/signup/planform')
  }
  return (
    <div className=''>
      <Header
        profile={dataAcount}
        lang={params?.lang}
        t={t}
      />
      <main className='relative'>{children}</main>
      <Footer t={t} />
    </div>
  )
}
