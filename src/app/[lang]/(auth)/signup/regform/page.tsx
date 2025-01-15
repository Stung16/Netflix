import getDictionary from '@/app/dictionaries'
import FormCreatePassMember from '@/sections/auth/FormCreatePassMember'
import React from 'react'

export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  return <FormCreatePassMember t={t} />
}
