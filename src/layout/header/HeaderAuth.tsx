/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import IcNetflix from '@/components/icons/IcNetflix'
import Link from 'next/link'

export default function HeaderAuth() {
  return (
    <div className='relative z-20 flex justify-center items-center'>
      <Link
        href={'/'}
        className='absolute top-8 left-[11.5rem] z-20'
      >
        <IcNetflix className='w-[9.25rem] h-10 text-[rgb(229,9,20)]' />
      </Link>
    </div>
  )
}
