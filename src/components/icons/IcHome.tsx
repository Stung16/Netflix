import React from 'react'

export default function IcHome({className = ''}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'
      width={24}
      height={24}
      aria-hidden='true'
      className={className}
    >
      <path
        d='M11.4855 2.14251C11.8022 1.9525 12.1978 1.9525 12.5145 2.14251L22.5145 8.14251C22.8157 8.32323 23 8.64874 23 9V21C23 21.5523 22.5523 22 22 22H15C14.4477 22 14 21.5523 14 21V16H10V21C10 21.5523 9.55228 22 9 22H2C1.44772 22 1 21.5523 1 21V9C1 8.64874 1.1843 8.32323 1.4855 8.14251L11.4855 2.14251ZM3 9.56619V20H8V15V14H9H15H16V15V20H21V9.56619L12 4.16619L3 9.56619Z'
        fill='currentColor'
      />
    </svg>
  )
}
