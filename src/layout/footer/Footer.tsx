/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import IcFB from '@/components/icons/IcFB'
import IcIG from '@/components/icons/IcIG'
import IcTw from '@/components/icons/IcTw'
import IcYT from '@/components/icons/IcYT'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer({t}: {t: any}) {
  return (
    <footer className='mt-[6rem] xsm:mt-12 pb-4 text-white flex flex-col px-[16rem] xsm:px-4'>
      {/* social */}
      <div className='flex items-center space-x-4 '>
        <Link href={'https://www.facebook.com/NetflixAsia'}>
          <IcFB className='w-8 xsm:w-4 block bg-cover' />
        </Link>
        <Link href={'https://www.instagram.com/netflixasia/'}>
          <IcIG className='w-8 xsm:w-4 block bg-cover' />
        </Link>
        <Link href={'https://x.com/NetflixAsia'}>
          <IcTw className='w-8 xsm:w-4 block bg-cover' />
        </Link>
        <Link
          href={
            'https://www.youtube.com/channel/UCZoC-XeDO7HxbAdeCaRPPCw/videos'
          }
        >
          <IcYT className='w-8 block bg-cover' />
        </Link>
      </div>
      {/* Quicklinks */}
      <div className='grid grid-cols-4 items-start justify-between mt-4 xsm:grid-cols-2'>
        <div>
          <ul className='space-y-2 text-sm xsm:text-[0.6rem] text-[#808080]'>
            <li className='hover:underline cursor-pointer'>Mô tả âm thanh</li>
            <li className='hover:underline cursor-pointer'>
              Quan hệ với nhà đầu tư
            </li>
            <li className='hover:underline cursor-pointer'>
              Thông báo pháp lý
            </li>
          </ul>
        </div>
        <div>
          <ul className='space-y-2 text-sm xsm:text-[0.6rem] text-[#808080]'>
            <li className='hover:underline cursor-pointer'>
              Trung tâm trợ giúp
            </li>
            <li className='hover:underline cursor-pointer'>Việc làm</li>
            <li className='hover:underline cursor-pointer'>Tùy chọn cookie</li>
          </ul>
        </div>
        <div>
          <ul className='space-y-2 text-sm xsm:text-[0.6rem] text-[#808080]'>
            <li className='hover:underline cursor-pointer'>Thẻ quà tặng</li>
            <li className='hover:underline cursor-pointer'>
              Điều khoản sử dụng
            </li>
            <li className='hover:underline cursor-pointer'>
              Thông tin doanh nghiệp
            </li>
          </ul>
        </div>
        <div>
          <ul className='space-y-2 text-sm xsm:text-[0.6rem] text-[#808080]'>
            <li className='hover:underline cursor-pointer'>
              Trung tâm đa phương tiện
            </li>
            <li className='hover:underline cursor-pointer'>Quyền riêng tư</li>
            <li className='hover:underline cursor-pointer'>
              Liên hệ với chúng tôi
            </li>
          </ul>
        </div>
      </div>
      {/* ifor */}
      <span className='text-xs xsm:text-[0.5rem] text-[#808080] mt-2'>
        © 1997-2025 Netflix, Inc.&lrm;
      </span>
    </footer>
  )
}
