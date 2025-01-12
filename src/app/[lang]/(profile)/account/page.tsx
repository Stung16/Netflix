/* eslint-disable @typescript-eslint/no-explicit-any */
import getDictionary from '@/app/dictionaries'
import {cn} from '@/lib/utils'
import InforService from '@/sections/account/InforService'
import Link from 'next/link'
import React from 'react'
export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  const quickLinks = [
    {
      link: '/account/manageaccountaccess',
      title: t.title.ManageAccess_devices,
      disabled: false,
    },
    {link: '/account/password', title: t.title.updatePassword, disabled: false},
  ]
  return (
    <div className='w-full'>
      <div className='px-4 xsm:px-0 xsm:text-[0.6rem]'>
        <h1 className='text-2xl xsm:text-base font-semibold'>
          {t.headerNav.profile.account}
        </h1>
        <p className='text-gray-600'>{t.headerNav.profile.inforMemberShip}</p>
      </div>
      <div className='mx-auto bg-white rounded-lg flex flex-col space-y-6'>
        {/* Membership Info */}
        <div className='p-4 xsm:p-2 border rounded-lg xsm:text-[0.6rem] xsm:mt-2'>
          <InforService t={t} />
          <Link
            href={'/account/membership'}
            className='block mt-4 w-full hover:bg-gray-100 text-gray-800 py-2 xsm:py-1 xsm:px-2 px-4 rounded-lg text-left xsm:mt-2'
          >
            {t.headerNav.profile.Manage_membership}
          </Link>
        </div>

        {/* Quick Links */}
        <div className='p-4 border rounded-lg xsm:p-2 xsm:text-[0.6rem]'>
          <h2 className='text-lg font-semibold mb-2 xsm:text-sm'>
            {t.title.quickLinks}
          </h2>
          <ul className='sm:space-y-2'>
            {quickLinks.map(
              (
                item: {link: string; title: string; disabled: boolean},
                idx: number,
              ) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className={cn(
                      'w-full block hover:bg-gray-100 text-gray-800 py-2 sm:px-4 rounded-lg text-left',
                      item.disabled && 'pointer-events-none',
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
