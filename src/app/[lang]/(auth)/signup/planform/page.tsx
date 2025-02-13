import getDictionary from '@/app/dictionaries'
import Plans from '@/sections/auth/Plans'
import React from 'react'
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
      <h1>{t.title.ChooseService}</h1>
      <Plans t={t} />
    </Suspense>
  )
}
