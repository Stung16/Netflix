'use client'
import {getRefreshFromLocalStorage, checkAuthRefreshToken} from '@/lib/utils'
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
          router.push(redirectPath || '/')
        },
      })
    }
  }, [router, refreshForomUrl, redirectPath])
  return <></>
}
