'use client'
import FormSignup from '@/sections/auth/FormSignup'
import React from 'react'

export default function Singup({params}: {params: {lang: string}}) {
  return <FormSignup lang={params.lang} />
}
