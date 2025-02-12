/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export default function IcBackHistory({
  className = '',
  onClick,
}: {
  className?: string
  onClick?: any
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      role='img'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      data-icon='ArrowLeftStandard'
      aria-hidden='true'
      className={className}
      onClick={onClick}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.41421 10.9998L21 10.9998L21 12.9998L6.41421 12.9998L11.7071 18.2927L10.2929 19.7069L3.29289 12.7069C2.90237 12.3164 2.90237 11.6832 3.29289 11.2927L10.2929 4.29272L11.7071 5.70694L6.41421 10.9998Z'
        fill='currentColor'
      ></path>
    </svg>
  )
}
