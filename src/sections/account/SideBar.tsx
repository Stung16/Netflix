import IcBackHistory from '@/components/icons/IcBackHistory'
import Link from 'next/link'
import React from 'react'

export default function SideBar() {
  return (
    <div className='flex flex-col'>
      <Link
        href={'/'}
        className={`flex items-center space-x-3`}
      >
        <IcBackHistory className='size-6 text-white' />
        <p>Quay lại Netflix</p>
      </Link>
      <ul>
        <li>Tổng quan</li>
        <li>Tư cách thành viên</li>
        <li>Bảo mật</li>
        <li>Thiết bị</li>
        <li>Hồ sơ</li>
      </ul>
    </div>
  )
}
