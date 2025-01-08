'use client'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import IcBackHistory from '@/components/icons/IcBackHistory'
import {cn} from '@/lib/utils'
import IcHome from '@/components/icons/IcHome'
import IcPayment from '@/components/icons/IcPayment'
import IcSecurity from '@/components/icons/IcSecurity'
import IcDevice from '@/components/icons/IcDevice'
// import IcProfile from '@/components/icons/IcProfile'
const showbar = [
  '/account/devices',
  '/account/membership',
  '/account/security',
  '/account/devices',
  '/account/profiles',
]

export default function NavBarAccount() {
  const pathname = usePathname()
  const isshowbar =
    showbar.some((path: string) => pathname.startsWith(path)) ||
    pathname === '/account'
  return (
    isshowbar && (
      <div className='min-w-[15rem] xsm:min-w-[6rem] xsm:text-[0.6rem]'>
        <div>
          <ul className='grid grid-cols-1 gap-y-4'>
            <li>
              <Link
                href={'/'}
                className='flex items-center space-x-3 xsm:text-[0.5rem]'
              >
                <IcBackHistory className='size-6 xsm:size-3 text-black' />
                Quay lại Netflix
              </Link>
            </li>
            <li>
              <Link
                href={'/account'}
                className='flex items-center sm:space-x-2 mt-6 xsm:mt-2'
              >
                <IcHome
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname === '/account' && 'text-black',
                  )}
                />
                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem] ${
                    pathname === '/account' && 'text-black'
                  }`}
                >
                  Tổng quan
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={'/account/membership'}
                className='flex items-center sm:space-x-2'
              >
                <IcPayment
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname.startsWith('/account/membership') && 'text-black',
                  )}
                />
                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem]   ${
                    pathname.startsWith('/account/membership') && 'text-black'
                  }`}
                >
                  Tư cách thành viên
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={'/account/security'}
                className='flex items-center sm:space-x-2'
              >
                <IcSecurity
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname.startsWith('/account/security') && 'text-black',
                  )}
                />
                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem]   ${
                    pathname.startsWith('/account/security') && 'text-black'
                  }`}
                >
                  Bảo mật
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={'/account/devices'}
                className='flex items-center sm:space-x-2'
              >
                <IcDevice
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname.startsWith('/account/devices') && 'text-black',
                  )}
                />

                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem]   ${
                    pathname.startsWith('/account/devices') && 'text-black'
                  }`}
                >
                  Thiết bị
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href={'/account/profiles'}
                className='flex items-center sm:space-x-2'
              >
                <IcProfile
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname.startsWith('/account/profiles') && 'text-black',
                  )}
                />

                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem]   ${
                    pathname.startsWith('/account/profiles') && 'text-black'
                  }`}
                >
                  Hồ sơ
                </span>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    )
  )
}
