'use client'
import authApiRequest from '@/apiRequest/auth'
import {
  getRefreshFromLocalStorage,
  checkAuthRefreshToken,
  getDeviceInfo,
} from '@/lib/utils'
import {useRouter, useSearchParams} from 'next/navigation'
import React, {useEffect} from 'react'

export default function RefreshTokenPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshForomUrl = searchParams.get('refreshToken')
  const redirectPath = searchParams.get('redirect')

  useEffect(() => {
    if (refreshForomUrl && refreshForomUrl === getRefreshFromLocalStorage()) {
      checkAuthRefreshToken({
        onSuccess: async () => {
          await authApiRequest.UpdateActive({
            device: getDeviceInfo(),
          })
          router.push(redirectPath || '/')
        },
      })
    }
  }, [router, refreshForomUrl, redirectPath])
  return <></>
}
