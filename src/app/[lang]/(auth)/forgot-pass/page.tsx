import getDictionary from '@/app/dictionaries'
import FormForgotPass from '@/sections/auth/FormForgotPass'
import React from 'react'

export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])

  return <FormForgotPass t={t} />
}
