import React from 'react'

export default function IcFB({className = ''}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      role='img'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      data-icon='FacebookStandard'
      aria-hidden='true'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.987 13.1621V21.9841H10.042V13.1621H6.84198V9.51207H10.047V6.73207C10.047 3.56707 11.932 1.82007 14.815 1.82007C15.7618 1.83321 16.7063 1.91577 17.641 2.06707V5.17307H16.045C15.4954 5.10007 14.9424 5.28088 14.5421 5.66447C14.1417 6.04807 13.9375 6.59284 13.987 7.14507V9.51207H17.487L16.928 13.1621H13.987Z'
        fill='currentColor'
      ></path>
    </svg>
  )
}
