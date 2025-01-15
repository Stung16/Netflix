/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
interface Plan {
  title: string
  price: number
  quality: string
  resolution: string
  devices: string
  isPopular: boolean
  t: any
}
interface PlanCardProps extends Plan {
  isSelected: boolean
  onClick: () => void
}
export default function PlanCard({
  title,
  price,
  quality,
  resolution,
  devices,
  isPopular,
  isSelected,
  onClick,
  t,
}: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-lg p-4 shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      {isPopular && (
        <div className='bg-red-500 text-white text-sm px-2 py-1 rounded-full inline-block mb-2'>
          {t.title.popularMost}
        </div>
      )}
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-gray-700 mb-1'>{`Giá hàng tháng: ${price.toLocaleString('vi-VN')} đ`}</p>
      <p className='text-gray-700 mb-1'>
        {t.title.qualityAndImage}: {quality}
      </p>
      <p className='text-gray-700 mb-1'>
        {t.title.Resolution}: {resolution}
      </p>
      <p className='text-gray-700'>
        {t.title.deviceSupport}: {devices}
      </p>
    </div>
  )
}
