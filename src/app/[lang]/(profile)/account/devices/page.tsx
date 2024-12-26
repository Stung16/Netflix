import IcNextSlide from '@/components/icons/IcNextSlide'
import Link from 'next/link'
import React from 'react'
interface PrivacyAccess {
  heading: string
  label: string
  link: string
  description: string
}
export default function page() {
  const privacyAccess: PrivacyAccess[] = [
    {
      heading: 'Truy cập tài khoản',
      label: 'Truy cập và thiết bị',
      link: '/account/manageaccountaccess',
      description: 'Quản lý thiết bị đã đăng nhập',
    },
    {
      heading: 'Tải xuống thiết bị di động',
      label: 'Chuyển hồ sơ',
      link: '',
      description: 'Đang dùng 0/2 thiết bị tải xuống',
    },
  ]
  return (
    <div className='w-full'>
      <div>
        <h1 className='text-2xl font-semibold'>Thiết bị</h1>
      </div>
      <div className='flex flex-col space-y-4 mt-4'>
        {privacyAccess.map((item, idx) => (
          <div
            key={idx}
            className='cursor-pointer'
          >
            <p className='text-gray-600'>{item.heading}</p>
            <Link
              href={item.link}
              className='flex hover:bg-gray-100 px-4 py-2 items-center justify-between border rounded-lg'
            >
              <div>
                <h2 className='font-medium'>{item.label}</h2>
                <p className='text-gray-600 text-sm'>{item.description}</p>
              </div>
              <div className='flex items-center'>
                <IcNextSlide className='size-4' />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
