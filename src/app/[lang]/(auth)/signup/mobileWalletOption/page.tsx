import getDictionary from '@/app/dictionaries'
import WalletOption from '@/sections/auth/WalletOption'
import React from 'react'
import LoadingForm from '@/components/Loading/LoadingForm'
import {Suspense} from 'react'

export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])

  return (
    <Suspense fallback={<LoadingForm />}>
      <WalletOption t={t} />
    </Suspense>
  )
}
