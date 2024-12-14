import React from 'react'

export default function IcPayment({className = ''}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      role='img'
      viewBox='0 0 24 24'
      width={24}
      height={24}
      data-icon='CreditCardStandard'
      aria-hidden='true'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 6C0 4.34315 1.34315 3 3 3H21C22.6569 3 24 4.34315 24 6V18C24 19.6569 22.6569 21 21 21H3C1.34314 21 0 19.6569 0 18V6ZM3 5C2.44772 5 2 5.44772 2 6V8H22V6C22 5.44771 21.5523 5 21 5H3ZM2 18V10H22V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18ZM16 16H20V14H16V16Z'
        fill='currentColor'
      />
    </svg>
  )
}
