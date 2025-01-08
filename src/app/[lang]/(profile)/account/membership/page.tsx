'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useStore from '@/app/(store)/profile'
import {Skeleton} from '@/components/ui/skeleton'
import {
  formatPhoneNumber,
  getNextPaymentDate,
  listService,
  propService,
} from '@/lib/utils'

export default function Membership() {
  const {profile} = useStore((state) => state)

  return (
    <div className='w-full'>
      <div className='px-4 xsm:px-0 xsm:text-[0.6rem]'>
        <h1 className='text-2xl xsm:text-base font-semibold'>
          Tư cách thành viên
        </h1>
        <p className='text-gray-600'>Thông tin gói dịch vụ</p>
      </div>
      <div className='mt-4 flex flex-col space-y-4'>
        {/* Membership Details */}
        <div className='py-4 border rounded-lg'>
          <div className='flex flex-col'>
            <div className='px-4 xsm:px-2 flex flex-col space-y-2'>
              {profile ? (
                <h2 className='text-xl font-semibold xsm:text-base'>
                  {listService[profile?.subscriptions_id as keyof propService]}
                </h2>
              ) : (
                <Skeleton className='h-5 w-[10rem] xsm:w-[6rem]' />
              )}
              {profile ? (
                <p className='text-gray-600 xsm:text-[0.6rem]'>
                  Độ phân giải video 1080p, không quảng cáo khi xem và hơn thế
                  nữa.
                </p>
              ) : (
                <Skeleton className='h-5 w-[10rem] xsm:w-[6rem]' />
              )}
            </div>
            <Link
              href={'/account/membership'}
              className='block mt-4 w-full hover:bg-gray-100 text-gray-800 py-2 xsm:py-1 xsm:px-2 px-4 rounded-lg text-left xsm:mt-2 xsm:text-[0.6rem]'
            >
              Thay đổi gói dịch vụ
            </Link>
          </div>
        </div>

        {/* Payment Details */}
        <div className='xsm:p-2 p-4 border rounded-lg'>
          <h2 className='text-lg font-semibold mb-2 xsm:text-sm'>
            Thông tin thanh toán
          </h2>
          <div className='border-b pb-4'>
            <div className='mb-4'>
              <h3 className='text-gray-800 font-medium xsm:text-sm'>
                Lần thanh toán tiếp theo
              </h3>
              {profile ? (
                <p className='text-gray-600 xsm:text-[0.6rem]'>
                  {getNextPaymentDate(profile?.transactions[0]?.updated_at)}
                </p>
              ) : (
                <Skeleton className='h-5 w-[15rem]' />
              )}
              <div className='flex items-center space-x-2'>
                <Image
                  alt=''
                  src={'/images/MOMOPAY.png'}
                  width={100}
                  height={100}
                  className='w-6 h-4'
                />
                {profile ? (
                  <p className='text-gray-600 font-medium xsm:text-[0.6rem]'>
                    {formatPhoneNumber(profile?.phone.toString())}
                  </p>
                ) : (
                  <Skeleton className='h-5 w-[8rem]' />
                )}
              </div>
            </div>
            <ul>
              <li>
                <button className='w-full text-gray-800 py-2 sm:px-4 xsm:text-[0.6rem] rounded-lg text-left hover:bg-gray-200'>
                  Xem lịch sử thanh toán
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Cancel Membership */}
        <div className='sm:p-4'>
          <button className='w-full bg-red-100 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-200 xsm:text-[0.6rem]'>
            Hủy tư cách thành viên
          </button>
        </div>
      </div>
    </div>
  )
}
