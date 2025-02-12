import getDictionary from '@/app/dictionaries'
import FormLogin from '@/sections/auth/FormLogin'
import LoadingForm from '@/components/Loading/LoadingForm'
import {Suspense} from 'react'
export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  return (
    <Suspense fallback={<LoadingForm />}>
      <FormLogin t={t} />
    </Suspense>
  )
}
