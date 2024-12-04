'use client'

import {useEffect} from 'react'

export default function NotFound() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])
  return (
    <div className='h-screen w-full bg-white fixed top-0 left-0'>not-found</div>
  )
}
