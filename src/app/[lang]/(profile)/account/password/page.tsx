import getDictionary from '@/app/dictionaries'
import FormUpdatePass from '@/sections/auth/FormUpdatePass'

export default async function Password({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  return (
    <div className='sm:flex justify-center items-center w-full xsm:text-[0.6rem]'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold sm:mb-4 xsm:text-base'>
          {t.title.changePass}
        </h1>
        <p className='text-gray-600 mb-6'>{t.desc.changePass}</p>
        <FormUpdatePass t={t} />
      </div>
    </div>
  )
}
