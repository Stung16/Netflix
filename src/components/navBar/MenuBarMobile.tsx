import Link from 'next/link'
import React, {memo, useState, useEffect, useRef} from 'react'

const MenuBarMobile = () => {
  const [active, setActive] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <div
      ref={menuRef}
      className='sm:hidden text-[0.6rem] text-white relative'
    >
      <div
        className='ml-4 list-none flex items-center justify-between'
        onClick={() => {
          setActive(!active)
        }}
      >
        Duyệt tìm
        <span className=' transition-all border-[#fff_transparent_transparent] border-solid border-t-[0.313rem] border-x-[0.313rem] border-b-0 size-0 ml-1'></span>
      </div>
      {active && (
        <ul className='absolute bg-[rgb(20,20,20)] top-full left-4 p-1 z-20 w-[5rem] flex flex-col space-y-1'>
          <li onClick={() => setActive(false)}>
            <Link href={'/'}>Trang chủ</Link>
          </li>
          <li onClick={() => setActive(false)}>
            <Link href={'/genre/genres2'}>Phim T.hình</Link>
          </li>
          <li onClick={() => setActive(false)}>
            <Link href={'/genre/genres3'}>Phim</Link>
          </li>
          <li onClick={() => setActive(false)}>
            <Link href={'/latest'}>Mới & Phổ biến</Link>
          </li>
          <li onClick={() => setActive(false)}>
            <Link href={'/my-list'}>Danh sách của tôi</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default memo(MenuBarMobile)
