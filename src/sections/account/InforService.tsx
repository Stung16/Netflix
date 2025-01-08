/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import useStore from '@/app/(store)/profile'
import {Skeleton} from '@/components/ui/skeleton'
import {
  convertDateToMembership,
  formatPhoneNumber,
  getNextPaymentDate,
  listService,
  propService,
} from '@/lib/utils'

export default function InforService() {
  const {profile} = useStore((state) => state)
  return (
    <div className='bg-purple-100 p-4 xsm:p-2 rounded-lg flex items-center sm:justify-between'>
      <div className='flex flex-col space-y-2'>
        {profile ? (
          <span className='bg-purple-600 text-white px-3 xsm:px-2 sm:py-1 w-fit rounded-full text-sm xsm:text-[0.6rem]'>
            {convertDateToMembership(profile?.transactions[0]?.created_at)}
          </span>
        ) : (
          <Skeleton className='h-5 w-[15rem] xsm:w-[10rem]' />
        )}
        {profile ? (
          <h2 className='mt-2 text-xl font-semibold xsm:text-sm'>
            {listService[profile?.subscriptions_id as keyof propService]}
          </h2>
        ) : (
          <Skeleton className='h-5 w-[10rem] xsm:w-[7rem]' />
        )}
        {profile ? (
          <p className='text-gray-600'>
            {`Ngày thanh toán tiếp theo: ${getNextPaymentDate(profile?.transactions[0]?.updated_at)}`}
          </p>
        ) : (
          <Skeleton className='h-5 w-[15rem] xsm:w-[10rem]' />
        )}
      </div>
      <div className='text-gray-600 font-medium'>
        {profile ? (
          formatPhoneNumber(profile?.phone.toString())
        ) : (
          <Skeleton className='h-5 w-[8rem] xsm:w-[4rem]' />
        )}
      </div>
    </div>
  )
}
