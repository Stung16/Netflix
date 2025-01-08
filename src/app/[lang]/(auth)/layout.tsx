import HeaderAuth from '@/layout/header/HeaderAuth'
import Image from 'next/image'

export default function LayoutAuth({children}: {children: React.ReactNode}) {
  return (
    <div className='relative bg-[#141414] xsm:bg-[rgba(0,0,0,0.7)] xsm:h-screen'>
      <Image
        src='/images/bg_main.jpg'
        alt='bg'
        width={1400}
        height={1000}
        className='w-screen h-screen object-cover absolute top-0 left-0 right-0 xsm:hidden'
      />
      <div className='xsm:hidden absolute top-0 left-0 right-0 min-h-screen bg-[rgb(0,0,0)] opacity-50 z-10' />
      <HeaderAuth />
      {children}
    </div>
  )
}
