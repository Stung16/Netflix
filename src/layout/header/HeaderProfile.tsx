'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useRouter} from 'next/navigation'
import {cn, getDeviceInfo, redirectLinkWithLang} from '@/lib/utils'
import {useEffect, useTransition} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import IcManager from '@/components/icons/IcManager'
import IcChangeProfile from '@/components/icons/IcChangeProfile'
import IcInforAcount from '@/components/icons/IcInforAcount'
import IcAcount from '@/components/icons/IcAcount'
import style from './style.module.css'
import IcBackHistory from '@/components/icons/IcBackHistory'
import IcLogo from '@/components/icons/IcLogo'
import useStore from '@/app/(store)/profile'
import authApiRequest from '@/apiRequest/auth'
import {toast} from 'sonner'

// import debounce from 'lodash/debounce'
export default function HeaderProfile({
  profile,
  t,
  lang,
}: {
  profile: any
  t: any
  lang: string
}) {
  const router = useRouter()
  const [isPending, setTransition] = useTransition()

  const {setProfile} = useStore((state) => state)
  useEffect(() => {
    const updateActive = async () => {
      setProfile(profile)
      if (profile) {
        await authApiRequest.UpdateActive({
          device: getDeviceInfo(navigator.userAgent),
        })
      }
    }
    updateActive()
  }, [router, profile, setProfile])
  function handleLogout() {
    setTransition(async () => {
      try {
        await authApiRequest.logout()
        toast.success(t.alerts.logoutSuccess)
      } catch (error: any) {
        console.log(error)
        toast.success(t.alerts.logoutSuccess)
      } finally {
        router.push('/login')
      }
    })
  }
  return (
    <header
      className={
        'flex items-center bg-white fixed left-0 right-0 h-auto min-h-[4.25rem] xsm:min-h-[3.25rem] z-[100] top-0 transition-["background-color"] duration-400 bg-transparent text-sm xsm:px-4 px-[20.75rem] [&.active]:shadow-xl border-b'
      }
    >
      {/* logo */}
      <Link href={redirectLinkWithLang(lang)}>
        <IcLogo className='w-[5rem] xsm:w-[3rem] text-[rgb(229,9,20)]' />
      </Link>
      {/* menuTab */}

      {/* infor */}
      <div className='items-center flex grow h-full justify-end absolute right-[20.75rem] xsm:right-6 text-sm top-0'>
        <div>
          <div className='text-xs relative z-0 group'>
            <div className='flex items-center cursor-pointer'>
              <Image
                width={50}
                height={50}
                className='rounded size-8 align-middle xsm:size-6'
                src={profile?.avatar || '/images/avatar.png'}
                alt='avatar'
              />
              <span className='xsm:hidden group-hover:rotate-180 transition-all border-[#666_transparent_transparent] border-solid border-t-[0.313rem] xsm:border-t-[0.25rem] xsm:border-x-[0.25rem] border-x-[0.313rem] border-b-0 size-0 ml-[0.625rem] xsm:ml-1'></span>
            </div>
            {/* Dropdown */}
            <div
              className={cn(
                'absolute right-0 min-w-[14rem] h-4 bg-transparent z-40 opacity-0 invisible transition-opacity duration-300 xsm:hidden',
                'group-hover:opacity-100 group-hover:visible',
              )}
            />
            <div
              className={cn(
                'absolute top-12 right-0 bg-[rgba(0,0,0,.9)] min-w-[14rem] opacity-0 invisible transition-opacity duration-300 xsm:hidden',
                'group-hover:opacity-100 group-hover:visible',
              )}
            >
              <ul className='flex px-2 flex-col text-[#b3b3b3] py-3 xsm:hidden'>
                <li>
                  <Link
                    href={redirectLinkWithLang(lang)}
                    className={`${style.itemListProfile} flex items-center space-x-3 border-b`}
                  >
                    <IcBackHistory className='size-6 text-white' />
                    <p>{t.navBar.backNetflix}</p>
                  </Link>
                </li>
                <li
                  className={`${style.itemListProfile} flex items-center space-x-3`}
                >
                  <IcManager className='size-6 text-white' />
                  <p>{t.headerNav.profile.manageProfiles}</p>
                </li>
                <li
                  className={`${style.itemListProfile} flex items-center space-x-3`}
                >
                  <IcChangeProfile className='size-6 text-white' />
                  <p>{t.headerNav.profile.switchProfiles}</p>
                </li>
                <li>
                  <Link
                    href={redirectLinkWithLang(lang, 'account')}
                    className={`${style.itemListProfile} flex items-center space-x-3`}
                  >
                    <IcAcount className='size-6 text-white' />
                    <p>{t.headerNav.profile.account}</p>
                  </Link>
                </li>
                <li
                  className={`${style.itemListProfile} flex items-center space-x-3`}
                >
                  <IcInforAcount className='size-6 text-white' />
                  <p>{t.headerNav.profile.helpCenter}</p>
                </li>
                <li
                  onClick={handleLogout}
                  className={`${style.itemListProfile} flex justify-center items-center space-x-3 border-t ${isPending && 'pointer-events-none'}`}
                >
                  <p>{t.headerNav.profile.signOut}</p>
                  {isPending && (
                    <div
                      className={`border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid animate-spin`}
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
