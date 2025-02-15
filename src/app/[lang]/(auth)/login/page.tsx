import getDictionary from '@/app/dictionaries'
import FormLogin from '@/sections/auth/FormLogin'
import LoadingForm from '@/components/Loading/LoadingForm'
import {Suspense} from 'react'
import type {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Netflix - Sign In',
  description:
    'Sign in to your Netflix account to continue watching your favorite movies and TV shows. Enjoy unlimited streaming anytime, anywhere.',
}

export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  return (
    <Suspense fallback={<LoadingForm />}>
      <FormLogin t={t} />
    </Suspense>
  )
}
