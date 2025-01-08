/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {formatDateTime} from '@/lib/utils'
import React from 'react'
import useStore from '@/app/(store)/profile'

export default function Device({device}: any) {
  const {profile} = useStore((state) => state)

  const deviceData = JSON.parse(device.device_info)
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-md p-4 xsm:p-2 xsm:text-[0.6rem]'>
      <div className='flex items-center justify-between'>
        <span className='font-medium capitalize'>
          {`${deviceData?.device?.type && deviceData?.device?.type} ${deviceData?.browser?.name && deviceData?.browser?.name} - Trình duyệt web`}
        </span>
        {profile?.id === device?.user_id && (
          <span className='bg-blue-400 text-xs xsm:text-[0.5rem] p-1'>
            Thiết bị hiện tại
          </span>
        )}
      </div>
      <span className='text-gray-500 text-left'>
        {formatDateTime(device.lastActive)}
      </span>
    </div>
  )
}
