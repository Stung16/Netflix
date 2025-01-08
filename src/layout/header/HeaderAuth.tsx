import IcNetflix from '@/components/icons/IcNetflix'
import Link from 'next/link'

export default function HeaderAuth() {
  return (
    <Link
      href={'/'}
      className='absolute top-8 left-[11.5rem] z-20 xsm:top-4 xsm:left-4'
    >
      <IcNetflix className='w-[9.25rem] xsm:w-[6rem] xsm:h-[1.5rem] h-10 text-[rgb(229,9,20)]' />
    </Link>
  )
}
