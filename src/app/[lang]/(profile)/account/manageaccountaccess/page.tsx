/* eslint-disable @typescript-eslint/no-explicit-any */
import acountApiRequest from '@/apiRequest/account'
import getDictionary from '@/app/dictionaries'
import Device from '@/sections/account/Device'
import {cookies} from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default async function page({params}: {params: {lang: string}}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  const [resDevices, t] = await Promise.all([
    acountApiRequest.Sdevice(accesstoken),
    getDictionary(params.lang),
  ])
  const dataDevices = resDevices.payload?.data

  return (
    <div className='text-center xsm:text-base'>
      <h1>{t.title.ManageAccess_devices}</h1>
      <p className='px-[5rem] xsm:px-4 xsm:text-[0.6rem]'>
        {t.desc.manageaccountaccess}{' '}
        <Link
          className='underline'
          href={'/account/password'}
        >
          {t.orther.changePass}
        </Link>{' '}
        {t.orther.strongSecurity}
      </p>
      <div className='grid grid-cols-2 gap-6 xsm:gap-4 mt-4'>
        {dataDevices.map((device: any, index: number) => (
          <Device
            key={index}
            device={device}
            t={t}
          />
        ))}
      </div>
    </div>
  )
}
