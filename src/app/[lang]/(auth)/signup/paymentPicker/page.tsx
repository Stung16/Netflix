import IcNextSlide from '@/components/icons/IcNextSlide'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='max-w-lg mx-auto p-8 relative bg-[#ddd] top-[10rem] z-50'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        Chọn cách thanh toán
      </h2>
      <p className='text-gray-600 text-center mb-6'>
        Quá trình thanh toán của bạn được mã hóa và bạn có thể thay đổi cách
        thanh toán bất kỳ lúc nào.
      </p>
      <div className='space-y-4'>
        <Link
          href={'mobileWalletOption'}
          className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer group`}
        >
          <div className='flex items-center justify-between w-full'>
            <span className='text-lg font-medium'>Ví điện tử</span>
            <IcNextSlide className='size-6' />
          </div>
        </Link>
      </div>
    </div>
  )
}
