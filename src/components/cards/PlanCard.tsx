import React from 'react'
interface Plan {
  title: string
  price: string
  quality: string
  resolution: string
  devices: string
  isPopular: boolean
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
          Phổ biến nhất
        </div>
      )}
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-gray-700 mb-1'>Giá hàng tháng: {price}</p>
      <p className='text-gray-700 mb-1'>Chất lượng hình và âm: {quality}</p>
      <p className='text-gray-700 mb-1'>Độ phân giải: {resolution}</p>
      <p className='text-gray-700'>Thiết bị hỗ trợ: {devices}</p>
    </div>
  )
}
