import getDictionary from '@/app/dictionaries'
import FormSignup from '@/sections/auth/FormSignup'
import LoadingForm from '@/components/Loading/LoadingForm'
import {Suspense} from 'react'

export default async function Singup({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  return (
    <Suspense fallback={<LoadingForm />}>
      <FormSignup t={t} />
    </Suspense>
  )
}
