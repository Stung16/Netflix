import getDictionary from '@/app/dictionaries'
import IcNextSlide from '@/components/icons/IcNextSlide'
import {redirectLinkWithLang} from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
interface PrivacyAccess {
  heading: string
  label: string
  link: string
  description: string
}
export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])

  const privacyAccess: PrivacyAccess[] = [
    {
      heading: t.title.accountAccess,
      label: t.title.Access_device,
      link: redirectLinkWithLang(params.lang, 'account/manageaccountaccess'),
      description: t.title.ManageDevice_logined,
    },
    {
      heading: t.title.dowloadDeviceMobile,
      label: t.headerNav.profile.switchProfiles,
      link: '',
      description: t.orther.usedDevice,
    },
  ]
  return (
    <div className='w-full'>
      <div>
        <h1 className='text-2xl xsm:text-base font-semibold'>
          {t.navBar.devices}
        </h1>
      </div>
      <div className='flex flex-col space-y-4 xsm:mt-2 mt-4 xsm:text-[0.6rem]'>
        {privacyAccess.map((item, idx) => (
          <div
            key={idx}
            className='cursor-pointer'
          >
            <p className='text-gray-600 xsm:hidden'>{item.heading}</p>
            <Link
              href={item.link}
              className='flex hover:bg-gray-100 px-4 py-2 items-center justify-between border rounded-lg'
            >
              <div>
                <h2 className='font-medium xsm:text-[0.6rem]'>{item.label}</h2>
                <p className='text-gray-600 text-sm xsm:text-[0.6rem]'>
                  {item.description}
                </p>
              </div>
              <div className='flex items-center'>
                <IcNextSlide className='size-4' />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
