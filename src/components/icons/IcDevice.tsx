import React from 'react'

export default function IcDevice({className = ''}: {className?: string}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      role='img'
      viewBox='0 0 24 24'
      width={24}
      height={24}
      data-icon='TvMobileStandard'
      aria-hidden='true'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 3.72727C0 2.77333 0.773326 2 1.72727 2H20.2727C21.2267 2 22 2.77333 22 3.72727V7H20V4H2V14H13V16H1.72727C0.773325 16 0 15.2267 0 14.2727V3.72727ZM13 17.3114C12.012 17.2708 11.0113 17.25 10 17.25C8.2756 17.25 6.5822 17.3104 4.92974 17.4268L5.07026 19.4218C6.67567 19.3088 8.32219 19.25 10 19.25C11.0121 19.25 12.0128 19.2714 13 19.3132V17.3114ZM22 11H17V20H22V11ZM17 9C15.8954 9 15 9.89543 15 11V20C15 21.1046 15.8954 22 17 22H22C23.1046 22 24 21.1046 24 20V11C24 9.89543 23.1046 9 22 9H17ZM19.5 18.5C19.9142 18.5 20.25 18.1642 20.25 17.75C20.25 17.3358 19.9142 17 19.5 17C19.0858 17 18.75 17.3358 18.75 17.75C18.75 18.1642 19.0858 18.5 19.5 18.5Z'
        fill='currentColor'
      />
    </svg>
  )
}
