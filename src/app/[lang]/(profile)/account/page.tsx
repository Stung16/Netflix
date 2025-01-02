/* eslint-disable @typescript-eslint/no-explicit-any */
import {cn} from '@/lib/utils'
import InforService from '@/sections/account/InforService'
import Link from 'next/link'
import React from 'react'
const quickLinks = [
  {link: '', title: 'Thay đổi gói dịch vụ', disabled: true},
  {
    link: '/account/manageaccountaccess',
    title: 'Quản lý quyền truy cập và thiết bị',
    disabled: false,
  },
  {link: '/account/password', title: 'Cập nhật mật khẩu', disabled: false},
  // {link: '', title: 'Chuyển hồ sơ'},
  // {link: '', title: 'Điều chỉnh tính năng kiểm soát của cha mẹ'},
]
export default function page() {
  return (
    <div className='w-full'>
      <div className='px-4'>
        <h1 className='text-2xl font-semibold'>Tài khoản</h1>
        <p className='text-gray-600'>Thông tin tư cách thành viên</p>
      </div>
      <div className='mx-auto bg-white rounded-lg flex flex-col space-y-6'>
        {/* Header */}

        {/* Membership Info */}
        <div className='p-4 border rounded-lg'>
          <InforService />
          <Link
            href={'/account/membership'}
            className='block mt-4 w-full hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-lg text-left'
          >
            Quản lý tư cách thành viên
          </Link>
        </div>

        {/* Quick Links */}
        <div className='p-4 border rounded-lg'>
          <h2 className='text-lg font-semibold mb-2'>Liên kết nhanh</h2>
          <ul className='space-y-2'>
            {quickLinks.map(
              (
                item: {link: string; title: string; disabled: boolean},
                idx: number,
              ) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className={cn(
                      'w-full block hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-lg text-left',
                      item.disabled && 'pointer-events-none',
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
