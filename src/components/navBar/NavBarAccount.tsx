/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import IcBackHistory from '@/components/icons/IcBackHistory'
import {cn, redirectLinkWithLang} from '@/lib/utils'
import IcHome from '@/components/icons/IcHome'
import IcPayment from '@/components/icons/IcPayment'
import IcSecurity from '@/components/icons/IcSecurity'
import IcDevice from '@/components/icons/IcDevice'
// import IcProfile from '@/components/icons/IcProfile'

export default function NavBarAccount({t, lang}: {t: any; lang: string}) {
  const showbar = [
    redirectLinkWithLang(lang, 'account/devices'),
    redirectLinkWithLang(lang, 'account/membership'),
    redirectLinkWithLang(lang, 'account/security'),
    redirectLinkWithLang(lang, 'account/profiles'),
  ]
  const pathname = usePathname()
  const isshowbar =
    showbar.some((path: string) => pathname.startsWith(path)) ||
    pathname === redirectLinkWithLang(lang, 'account')
  return (
    isshowbar && (
      <div className='min-w-[15rem] xsm:min-w-[6rem] xsm:text-[0.6rem]'>
        <div>
          <ul className='grid grid-cols-1 gap-y-4'>
            <li>
              <Link
                href={redirectLinkWithLang(lang)}
                className='flex items-center space-x-1 xsm:text-[0.5rem]'
              >
                <IcBackHistory className='size-6 xsm:size-3 text-black' />
                <span>{t.navBar.backNetflix}</span>
              </Link>
            </li>
            <li>
              <Link
                href={redirectLinkWithLang(lang, 'account')}
                className='flex items-center sm:space-x-2 mt-6 xsm:mt-2'
              >
                <IcHome
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname === redirectLinkWithLang(lang, 'account') &&
                      'text-black',
                  )}
                />
                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem] ${
                    pathname === redirectLinkWithLang(lang, 'account') &&
                    'text-black'
                  }`}
                >
                  {t.navBar.overview}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={redirectLinkWithLang(lang, 'account/membership')}
                className='flex items-center sm:space-x-2'
              >
                <IcPayment
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname.startsWith(
                      redirectLinkWithLang(lang, 'account/membership'),
                    ) && 'text-black',
                  )}
                />
                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem]   ${
                    pathname.startsWith(
                      redirectLinkWithLang(lang, 'account/membership'),
                    ) && 'text-black'
                  }`}
                >
                  {t.navBar.memberShip}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={redirectLinkWithLang(lang, 'account/security')}
                className='flex items-center sm:space-x-2'
              >
                <IcSecurity
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname.startsWith(
                      redirectLinkWithLang(lang, 'account/security'),
                    ) && 'text-black',
                  )}
                />
                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem]   ${
                    pathname.startsWith(
                      redirectLinkWithLang(lang, 'account/security'),
                    ) && 'text-black'
                  }`}
                >
                  {t.navBar.security}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={redirectLinkWithLang(lang, 'account/devices')}
                className='flex items-center sm:space-x-2'
              >
                <IcDevice
                  className={cn(
                    'size-4 text-[#6a6a6a] xsm:hidden',
                    pathname.startsWith(
                      redirectLinkWithLang(lang, 'account/devices'),
                    ) && 'text-black',
                  )}
                />

                <span
                  className={`block text-[#6A6A6A] text-base xsm:text-[0.6rem] not-italic font-medium leading-[120%] tracking-[-0.014rem]   ${
                    pathname.startsWith(
                      redirectLinkWithLang(lang, 'account/devices'),
                    ) && 'text-black'
                  }`}
                >
                  {t.navBar.devices}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  )
}
