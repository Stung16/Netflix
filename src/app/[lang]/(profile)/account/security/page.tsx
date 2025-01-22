/* eslint-disable @typescript-eslint/no-explicit-any */
import getDictionary from '@/app/dictionaries'
import InforSecurity from '@/sections/account/InforSecurity'

export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])

  return (
    <div className='w-full'>
      <div className='px-4 xsm:px-0 xsm:text-[0.6rem]'>
        <h1 className='text-2xl xsm:text-base font-semibold'>
          {t.navBar.security}
        </h1>
        <p className='text-gray-600'>{t.title.inforAccount}</p>
      </div>
      <InforSecurity
        t={t}
        lang={params.lang}
      />
    </div>
  )
}
