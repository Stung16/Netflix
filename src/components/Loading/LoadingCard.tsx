import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

export default function LoadingCard() {
  return (
    <div className='flex gap-4 p-4'>
      <Skeleton className='xsm:h-[6rem] h-[10rem] xsm:w-[45rem] w-[20vw] rounded-md bg-[#333]' />
      <Skeleton className='xsm:h-[6rem] h-[10rem] xsm:w-[45rem] w-[20vw] rounded-md bg-[#333]' />
      <Skeleton className='h-[10rem] xsm:hidden w-[20vw] rounded-md bg-[#333]' />
      <Skeleton className='h-[10rem] xsm:hidden w-[20vw] rounded-md bg-[#333]' />
      <Skeleton className='h-[10rem] xsm:hidden w-[20vw] rounded-md bg-[#333]' />
    </div>
  )
}
