'use client'
import {usePathname, useRouter} from 'next/navigation'
import React, {useEffect} from 'react'

import {checkAuthRefreshToken} from '@/lib/utils'

const UNAUTHENTICATED_PATH = ['/login', '/logout', '/refresh-token']
export default function RefreshToken() {
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return
    let interval: any = null
    checkAuthRefreshToken({
      onError: () => {
        clearInterval(interval)
        router.push('/login')
      },
    })
    const TIMEOUT = 1000
    interval = setInterval(
      () =>
        checkAuthRefreshToken({
          onError: () => {
            clearInterval(interval)
            router.push('/login')
          },
        }),
      TIMEOUT,
    )
    return () => {
      clearInterval(interval)
    }
  }, [pathname, router])
  return <></>
}
