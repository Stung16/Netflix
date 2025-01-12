import React from 'react'

import InforMembeShip from '@/sections/account/InforMembeShip'
import getDictionary from '@/app/dictionaries'

export default async function Membership({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])

  return (
    <div className='w-full'>
      <div className='px-4 xsm:px-0 xsm:text-[0.6rem]'>
        <h1 className='text-2xl xsm:text-base font-semibold'>
          {t.navBar.memberShip}
        </h1>
        <p className='text-gray-600'>{t.orther.inforService}</p>
      </div>
      <InforMembeShip t={t} />
    </div>
  )
}
