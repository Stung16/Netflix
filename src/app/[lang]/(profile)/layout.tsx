/* eslint-disable @typescript-eslint/no-explicit-any */
import {cookies} from 'next/headers'
import acountApiRequest from '@/apiRequest/account'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import HeaderProfile from '@/layout/header/HeaderProfile'
import {redirect} from 'next/navigation'
import NavBarAccount from '@/components/navBar/NavBarAccount'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  try {
    const [resAccount] = await Promise.all([acountApiRequest.Sme(accesstoken)])
    const dataAcount = resAccount.payload?.data
    if (!dataAcount?.subscriptions_id) {
      return redirect('/signup/planform')
    }
    return (
      <div className='bg-white'>
        <HeaderProfile profile={dataAcount} />
        <main className='relative min-h-screen xsm:mx-4 mx-[20.75rem] mt-[4.25rem] xsm:mt-[3rem] flex pt-8 sm:space-x-8'>
          <NavBarAccount />
          {children}
        </main>
      </div>
    )
  } catch (error: any) {
    console.log(error)
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }
}
