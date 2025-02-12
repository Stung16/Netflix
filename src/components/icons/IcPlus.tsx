import React from 'react'

export default function IcPlus({className = ''}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      role='img'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      data-icon='PlusStandard'
      aria-hidden='true'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z'
        fill='currentColor'
      ></path>
    </svg>
  )
}
