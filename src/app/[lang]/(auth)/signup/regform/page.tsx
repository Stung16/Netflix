import FormCreatePassMember from '@/sections/auth/FormCreatePassMember'
import React from 'react'

export default function page({params}: {params: {lang: string}}) {
  return <FormCreatePassMember lang={params.lang} />
}
