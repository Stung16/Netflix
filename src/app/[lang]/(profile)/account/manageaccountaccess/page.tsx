/* eslint-disable @typescript-eslint/no-explicit-any */
import acountApiRequest from '@/apiRequest/account'
import Device from '@/sections/account/Device'
import {cookies} from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  const [resDevices] = await Promise.all([
    acountApiRequest.Sdevice(accesstoken),
  ])
  const dataDevices = resDevices.payload?.data

  return (
    <div className='text-center xsm:text-base'>
      <h1>Quản lý quyền truy cập và thiết bị</h1>
      <p className='px-[5rem] xsm:px-4 xsm:text-[0.6rem]'>
        Gần đây, các thiết bị đã đăng nhập này đã hoạt động trên tài khoản này.
        Bạn có thể đăng xuất bất kỳ thiết bị lạ nào hoặc{' '}
        <Link
          className='underline'
          href={'/account/password'}
        >
          đổi mật khẩu
        </Link>{' '}
        để tăng cường bảo mật.
      </p>
      <div className='grid grid-cols-2 gap-6 xsm:gap-4 mt-4'>
        {dataDevices.map((device: any, index: number) => (
          <Device
            key={index}
            device={device}
          />
        ))}
      </div>
    </div>
  )
}
