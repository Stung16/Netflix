'use client'
import {Skeleton} from '@/components/ui/skeleton'

export default function LoadingForm() {
  return (
    <div className='relative z-50 h-screen w-screen flex items-center justify-center'>
      <div className='flex items-center justify-center w-[30vw] h-[50vh] bg-black '>
        <Skeleton className='h-[90%] w-[90%] rounded-xl bg-gray-200' />
      </div>
    </div>
  )
}
