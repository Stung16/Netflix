/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import IcNotification from '@/components/icons/IcNotification'
import IcSearch from '@/components/icons/IcSearch'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {cn} from '@/lib/utils'
import {useEffect, useState, useTransition} from 'react'
import {Input} from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
// import IcManager from '@/components/icons/IcManager'
// import IcChangeProfile from '@/components/icons/IcChangeProfile'
import IcInforAcount from '@/components/icons/IcInforAcount'
import IcAcount from '@/components/icons/IcAcount'
import style from './style.module.css'
import debounce from 'lodash/debounce'
import authApiRequest from '@/apiRequest/auth'
import {toast} from 'sonner'
export default function Header({profile}: any) {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const router = useRouter()
  const pathname = usePathname()
  const [active, setActive] = useState<boolean>(false)
  const [isPending, setTransition] = useTransition()
  const [search, setSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState('')
  const handleSearch = debounce((value: string) => {
    router.push(`/search?q=${encodeURIComponent(value)}`)
  }, 300) // Debounce 300ms

  // Xử lý khi người dùng nhập vào ô tìm kiếm
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    handleSearch(value) // Gọi debounce chuyển trang
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 0) {
        return setActive(false)
      }
      setActive(true)
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup listener khi component bị unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    if (q) {
      setSearchValue(q)
      setSearch(true)
    } else {
      setSearchValue('')
    }
  }, [q])

  function handleLogout() {
    setTransition(async () => {
      try {
        await authApiRequest.logout()
        toast.success(`đăng xuất thành công`)
      } catch (error: any) {
        console.log(error)
        toast.success(`đăng xuất thành công`)
      } finally {
        router.push('/login')
      }
    })
  }
  return (
    <header
      className={cn(
        'flex items-center bg-black fixed left-0 right-0 h-auto min-h-[4.25rem] z-[100] top-0 transition-["background-color"] duration-400 bg-transparent text-sm bg-[linear-gradient(180deg,rgba(0,0,0,.7)_10%,transparent)] px-[3.75rem] [&.active]:bg-[rgb(20,20,20)]',
        active && 'active',
      )}
    >
      {/* logo */}
      <Link
        href='/'
        className=''
      >
        <Image
          alt=''
          src={'/images/logo.png'}
          width={100}
          height={100}
          className='w-[5rem] h-auto'
        />
      </Link>
      {/* menuTab */}
      <ul className='text-sm leading-[1.063rem] flex items-center font-normal'>
        <li className='ml-[1.25rem] list-none'>
          <Link
            className={cn(
              'items-center text-neutral-200 leading-[1.063rem] hover:text-[#b3b3b3] flex h-full relative transition-[color] duration-400 cursor-pointer bg-transparent',
              pathname === '/' &&
                'font-medium hover:text-white cursor-default text-white',
            )}
            href={'/'}
          >
            Trang chủ
          </Link>
        </li>
        <li className='ml-[1.25rem] list-none'>
          <Link
            className={cn(
              'items-center text-neutral-200 leading-[1.063rem] hover:text-[#b3b3b3] flex h-full relative transition-[color] duration-400 cursor-pointer bg-transparent',
              pathname === '/genre/genres2' &&
                'font-medium hover:text-white cursor-default text-white',
            )}
            href={'/genre/genres2'}
          >
            Phim T.hình
          </Link>
        </li>
        <li className='ml-[1.25rem] list-none'>
          <Link
            className={cn(
              'items-center text-neutral-200 leading-[1.063rem] hover:text-[#b3b3b3] flex h-full relative transition-[color] duration-400 cursor-pointer bg-transparent',
              pathname === '/genre/genres3' &&
                'font-medium hover:text-white cursor-default text-white',
            )}
            href={'/genre/genres3'}
          >
            Phim
          </Link>
        </li>
        <li className='ml-[1.25rem] list-none'>
          <Link
            className={cn(
              'items-center text-neutral-200 leading-[1.063rem] hover:text-[#b3b3b3] flex h-full relative transition-[color] duration-400 cursor-pointer bg-transparent',
              pathname.startsWith(`/latest`) &&
                'font-medium hover:text-white cursor-default text-white',
            )}
            href={'/latest'}
          >
            Mới & Phổ biến
          </Link>
        </li>
        <li className='ml-[1.25rem] list-none'>
          <Link
            className={cn(
              'items-center text-neutral-200 leading-[1.063rem] hover:text-[#b3b3b3] flex h-full relative transition-[color] duration-400 cursor-pointer bg-transparent',
              pathname.startsWith(`/my-list`) &&
                'font-medium hover:text-white cursor-default text-white',
            )}
            href={'/my-list'}
          >
            Danh sách của tôi
          </Link>
        </li>
        {/* <li className='ml-[1.25rem] list-none'>
          <Link
            className={cn(
              'items-center text-neutral-200 leading-[1.063rem] hover:text-[#b3b3b3] flex h-full relative transition-[color] duration-400 cursor-pointer bg-transparent',
              pathname.startsWith(`/original-audio`) &&
                'font-medium hover:text-white cursor-default text-white',
            )}
            href={'/original-audio'}
          >
            Duyệt tìm theo ngôn ngữ
          </Link>
        </li> */}
      </ul>
      {/* infor */}
      <div className='items-center flex grow h-full justify-end absolute right-[3.75rem] text-sm top-0'>
        <div
          className='mr-[0.938rem]'
          onClick={() => setSearch(true)}
        >
          <div
            className={cn(
              'px-[0.375rem] cursor-pointer flex items-center',
              search &&
                'bg-[rgba(0,0,0,.75)] border border-[#fff] pl-[0.2rem] pr-4',
            )}
          >
            <IcSearch className='text-white size-6' />

            <Input
              value={searchValue}
              onBlur={(e) => {
                if (e.target.value !== '') return
                e.target.value = ''
                setSearch(false)
              }}
              onChange={onInputChange}
              className={cn(
                'border-transparent outline-transparent text-white placeholder:text-gray-300 focus-visible:ring-0 transition-all w-0 invisible p-0',
                search && 'w-auto visible px-3 py-1',
              )}
              type='text'
              placeholder='Phim,diễn viên,thể loại...'
            />
          </div>
        </div>
        <div className='mr-[0.938rem]'>
          <div className='bg-transparent text-[1.5em] cursor-pointer leading-none relative mt-[0.2em] pt-[0.125rem] pb-[0.188rem]  border-[none]'>
            <IcNotification className='text-white size-6' />
          </div>
        </div>
        <div>
          <div className='text-xs relative z-0 group'>
            <div className='flex items-center cursor-pointer'>
              <Image
                width={50}
                height={50}
                className='rounded size-8 align-middle'
                src={profile?.avatar || '/images/avatar.png'}
                alt='avatar'
              />
              <span className='group-hover:rotate-180 transition-all border-[#fff_transparent_transparent] border-solid border-t-[0.313rem] border-x-[0.313rem] border-b-0 size-0 ml-[0.625rem]'></span>
            </div>
            {/* Dropdown */}
            <div
              className={cn(
                'absolute right-0 min-w-[14rem] h-4 bg-transparent z-40 opacity-0 invisible transition-opacity duration-300',
                'group-hover:opacity-100 group-hover:visible',
              )}
            />
            <div
              className={cn(
                'absolute top-12 right-0 bg-[rgba(0,0,0,.9)] min-w-[14rem] opacity-0 invisible transition-opacity duration-300',
                'group-hover:opacity-100 group-hover:visible',
              )}
            >
              <ul className='flex px-2 flex-col text-[#b3b3b3] py-3'>
                {/* <li
                  className={`${style.itemListProfile} flex items-center space-x-3`}
                >
                  <IcManager className='size-6 text-white' />
                  <p>Quản lý hồ sơ</p>
                </li>
                <li
                  className={`${style.itemListProfile} flex items-center space-x-3`}
                >
                  <IcChangeProfile className='size-6 text-white' />
                  <p>Chuyển hồ sơ</p>
                </li> */}
                <li>
                  <Link
                    href={'/account'}
                    className={`${style.itemListProfile} flex items-center space-x-3`}
                  >
                    <IcAcount className='size-6 text-white' />
                    <p>Tài khoản</p>
                  </Link>
                </li>
                <li
                  className={`${style.itemListProfile} flex items-center space-x-3`}
                >
                  <IcInforAcount className='size-6 text-white' />
                  <p>Trung tâm trợ giúp</p>
                </li>
                <li
                  onClick={handleLogout}
                  className={`${style.itemListProfile} flex justify-center items-center space-x-3 border-t ${isPending && 'pointer-events-none'}`}
                >
                  <p>Đăng xuất khỏi Netflix</p>
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
