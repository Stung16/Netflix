/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import IcNextSlide from '@/components/icons/IcNextSlide'
import Link from 'next/link'
import React from 'react'
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
  return (
    <div className='w-full'>
      <div>
        <h1 className='text-2xl font-semibold'>Bảo mật</h1>
        <p className='text-gray-600'>Thông tin tài khoản</p>
      </div>
      <div className='flex flex-col space-y-4'>
        {/* Account Information */}
        <div className='p-4 space-y-4 border rounded-lg'>
          {accountInfo.map((item, idx) => (
            <Link
              key={idx}
              href={item.link || ''}
              className='flex hover:bg-gray-100 items-center justify-between px-4 py-2 cursor-pointer'
            >
              <div className='flex items-center'>
                <span className='text-xl mr-4'>{item.icon}</span>
                <div>
                  <h2 className='font-medium'>{item.label}</h2>
                  <p className='text-gray-600'>{item.value}</p>
                  {item.needsAction && (
                    <span className='text-red-600 text-sm'>
                      {item.actionText}
                    </span>
                  )}
                </div>
              </div>
              <IcNextSlide className='size-4' />
            </Link>
          ))}
        </div>

        {/* Privacy and Access */}
        <div className='p-4 space-y-4 border rounded-lg'>
          <h2 className='text-lg font-semibold'>Truy cập và quyền riêng tư</h2>
          {privacyAccess.map((item, idx) => (
            <Link
              href={item.link || ''}
              key={idx}
              className='flex hover:bg-gray-100 px-4 py-2 items-center justify-between cursor-pointer'
            >
              <div>
                <h2 className='font-medium'>{item.label}</h2>
                <p className='text-gray-600 text-sm'>{item.description}</p>
              </div>
              <div className='flex items-center'>
                {item.badge && (
                  <span className='text-blue-600 bg-blue-100 text-xs px-2 py-1 rounded-lg mr-2'>
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
