/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {usePathname, useRouter} from 'next/navigation'
import React, {useEffect} from 'react'

import {checkAuthRefreshToken, getDeviceInfo} from '@/lib/utils'
import authApiRequest from '@/apiRequest/auth'

const UNAUTHENTICATED_PATH = ['/login', '/logout', '/refresh-token']
export default function RefreshToken() {
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return
    let interval: any = null
    checkAuthRefreshToken({
      onSuccess: async () => {
        await authApiRequest.UpdateActive({
          device: getDeviceInfo(),
        })
      },
      onError: () => {
        clearInterval(interval)
        router.push('/login')
      },
    })
    const TIMEOUT = 1000
    interval = setInterval(
      () =>
        checkAuthRefreshToken({
          onSuccess: async () => {
            await authApiRequest.UpdateActive({
              device: getDeviceInfo(),
            })
          },
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
