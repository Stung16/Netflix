import getDictionary from '@/app/dictionaries'
import FormSignup from '@/sections/auth/FormSignup'
import React from 'react'

export default async function Singup({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  return <FormSignup t={t} />
}
