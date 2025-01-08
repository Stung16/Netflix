/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import IcNextSlide from '@/components/icons/IcNextSlide'
import Link from 'next/link'
import React from 'react'
import useStore from '@/app/(store)/profile'
import {Skeleton} from '@/components/ui/skeleton'

interface AccountInfo {
  label: string
  icon: string
  value: string
  needsAction?: boolean
  actionText?: string
  link: string
}

interface PrivacyAccess {
  label: string
  description: string
  link?: string
  badge?: string
}

export default function page() {
  const {profile} = useStore((state) => state)

  const accountInfo: AccountInfo[] = [
    {
      label: 'Mật khẩu',
      icon: '🔒',
      value: '',
      needsAction: false,
      link: '/account/password',
    },
    {
      label: 'Email',
      icon: '📧',
      value: 'thanhhuyendury@gmail.com',
      needsAction: true,
      actionText: 'Cần xác thực',
      link: '',
    },
    {
      label: 'Điện thoại di động',
      icon: '📱',
      value: '0966 222 942',
      needsAction: false,
      link: '',
    },
  ]

  const privacyAccess: PrivacyAccess[] = [
    {
      label: 'Truy cập và thiết bị',
      link: '/account/manageaccountaccess',
      description: 'Quản lý thiết bị đã đăng nhập',
    },
    // {label: 'Chuyển hồ sơ', description: '', badge: 'Mới'},
    // {
    //   label: 'Truy cập thông tin cá nhân',
    //   description: 'Yêu cầu bản sao thông tin cá nhân của bạn',
    // },
    // {label: 'Thử nghiệm tính năng', description: ''},
  ]
  console.log(profile)

  return (
    <div className='w-full'>
      <div className='px-4 xsm:px-0 xsm:text-[0.6rem]'>
        <h1 className='text-2xl xsm:text-base font-semibold'>Bảo mật</h1>
        <p className='text-gray-600'>Thông tin tài khoản</p>
      </div>
      <div className='flex flex-col space-y-4'>
        {/* Account Information */}
        <div className='p-4 xsm:p-2 sm:space-y-4 border rounded-lg xsm:text-[0.6rem]'>
          <Link
            href={'/account/password'}
            className='flex hover:bg-gray-100 items-center justify-between px-4 py-2 cursor-pointer'
          >
            <div className='flex items-center'>
              <span className='text-xl mr-4 xsm:hidden'>🔒</span>
              <div>
                <h2 className='font-medium'>Mật khẩu</h2>
              </div>
            </div>
            <IcNextSlide className='size-4' />
          </Link>
          <div className='flex hover:bg-gray-100 items-center justify-between px-4 py-2 cursor-pointer'>
            <div className='flex items-center'>
              <span className='text-xl mr-4 xsm:hidden'>📧</span>
              <div className='flex flex-col space-y-2'>
                {profile ? (
                  <h2 className='font-medium'>Email</h2>
                ) : (
                  <Skeleton className='h-5 w-[10rem]' />
                )}
                {profile ? (
                  <p className='text-gray-600'>{profile?.email}</p>
                ) : (
                  <Skeleton className='h-5 w-[10rem]' />
                )}
              </div>
            </div>
          </div>
          <div className='flex hover:bg-gray-100 items-center justify-between px-4 py-2 cursor-pointer'>
            <div className='flex items-center'>
              <span className='text-xl mr-4 xsm:hidden'>📱</span>
              <div className='flex flex-col space-y-2'>
                {profile ? (
                  <h2 className='font-medium'>Điện thoại di động</h2>
                ) : (
                  <Skeleton className='h-5 w-[10rem]' />
                )}
                {profile ? (
                  <p className='text-gray-600'>0{profile?.phone}</p>
                ) : (
                  <Skeleton className='h-5 w-[10rem]' />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy and Access */}
        <div className='p-4 xsm:p-2 sm:space-y-4 border rounded-lg'>
          <h2 className='text-lg font-semibold xsm:text-base'>
            Truy cập và quyền riêng tư
          </h2>
          {privacyAccess.map((item, idx) => (
            <Link
              href={item.link || ''}
              key={idx}
              className='flex hover:bg-gray-100 px-4 py-2 items-center justify-between cursor-pointer'
            >
              <div>
                <h2 className='font-medium xsm:text-[0.6rem]'>{item.label}</h2>
                <p className='text-gray-600 text-sm xsm:text-[0.6rem]'>
                  {item.description}
                </p>
              </div>
              <div className='flex items-center'>
                {item.badge && (
                  <span className='text-blue-600 bg-blue-100 text-xs xsm:text-[0.6rem] px-2 py-1 rounded-lg mr-2'>
                    {item.badge}
                  </span>
                )}
                <IcNextSlide className='size-4' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
