import getDictionary from '@/app/dictionaries'
import IcNextSlide from '@/components/icons/IcNextSlide'
import Link from 'next/link'
import {Suspense} from 'react'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation' // Import redirect

export default async function page({params}: {params: {lang: string}}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  if (!accesstoken) return redirect('/login')
  const [t] = await Promise.all([getDictionary(params.lang)])

  return (
    <Suspense fallback={<div>...loading</div>}>
      <div className='max-w-lg mx-auto p-8 relative bg-[#ddd] top-[10rem] z-50'>
        <h2 className='text-2xl font-bold text-center mb-6'>
          {t.title.choosePayment}
        </h2>
        <p className='text-gray-600 text-center mb-6'>
          {t.desc.progressPayment}
        </p>
        <div className='space-y-4'>
          <Link
            href={'mobileWalletOption'}
            className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer group`}
          >
            <div className='flex items-center justify-between w-full'>
              <span className='text-lg font-medium'>{t.orther.e_wallet}</span>
              <IcNextSlide className='size-6' />
            </div>
          </Link>
        </div>
      </div>
    </Suspense>
  )
}
