import getDictionary from '@/app/dictionaries'
import WalletOption from '@/sections/auth/WalletOption'
import React from 'react'
import LoadingForm from '@/components/Loading/LoadingForm'
import {Suspense} from 'react'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation' // Import redirect

export default async function page({params}: {params: {lang: string}}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  if (!accesstoken) return redirect('/login')
  const [t] = await Promise.all([getDictionary(params.lang)])

  return (
    <Suspense fallback={<LoadingForm />}>
      <WalletOption t={t} />
    </Suspense>
  )
}
