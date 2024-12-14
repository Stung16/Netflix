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
      <div className='px-4'>
        <h1 className='text-2xl font-semibold'>Tư cách thành viên</h1>
        <p className='text-gray-600'>Thông tin gói dịch vụ</p>
      </div>
      <div className='mt-4 flex flex-col space-y-4'>
        {/* Membership Details */}
        <div className='py-4 border rounded-lg'>
          <div className='flex flex-col'>
            <div className='px-4 flex flex-col space-y-2'>
              {profile ? (
                <h2 className='text-xl font-semibold'>
                  {listService[profile?.subscriptions_id as keyof propService]}
                </h2>
              ) : (
                <Skeleton className='h-5 w-[10rem]' />
              )}
              {profile ? (
                <p className='text-gray-600'>
                  Độ phân giải video 1080p, không quảng cáo khi xem và hơn thế
                  nữa.
                </p>
              ) : (
                <Skeleton className='h-5 w-[10rem]' />
              )}
            </div>
            <Link
              href={'/account/membership'}
              className='block mt-4 w-full hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-lg text-left'
            >
              Thay đổi gói dịch vụ
            </Link>
          </div>
        </div>

        {/* Payment Details */}
        <div className='p-4 border rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Thông tin thanh toán</h2>
          <div className='border-b pb-4'>
            <div className='mb-4'>
              <h3 className='text-gray-800 font-medium'>
                Lần thanh toán tiếp theo
              </h3>
              {profile ? (
                <p className='text-gray-600'>
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
                  <p className='text-gray-600 font-medium'>
                    {formatPhoneNumber(profile?.phone.toString())}
                  </p>
                ) : (
                  <Skeleton className='h-5 w-[8rem]' />
                )}
              </div>
            </div>
            <ul className='space-y-2'>
              {['Xem lịch sử thanh toán'].map((item, idx) => (
                <li key={idx}>
                  <button className='w-full text-gray-800 py-2 px-4 rounded-lg text-left hover:bg-gray-200'>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cancel Membership */}
        <div className='p-4'>
          <button className='w-full bg-red-100 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-200'>
            Hủy tư cách thành viên
          </button>
        </div>
      </div>
    </div>
  )
}
