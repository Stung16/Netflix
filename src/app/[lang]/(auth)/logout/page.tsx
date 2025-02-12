'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import authApiRequest from '@/apiRequest/auth'
import LoadingNetflix from '@/components/Loading/LoadingNetflix'
import {
  getRefreshFromLocalStorage,
  getAccessFromLocalStorage,
} from '@/lib/utils'
import {useRouter, useSearchParams} from 'next/navigation'
import React, {useEffect, useRef} from 'react'

export default function LogogOut() {
  const router = useRouter()
  const ref = useRef<any>(null)
  const searchParams = useSearchParams()
  const refreshForomUrl = searchParams.get('refreshToken')
  const accessForomUrl = searchParams.get('accessToken')
  useEffect(() => {
    if (
      ref.current ||
      (refreshForomUrl && refreshForomUrl !== getRefreshFromLocalStorage()) ||
      (accessForomUrl && accessForomUrl !== getAccessFromLocalStorage())
    )
      return
    const fetch = async () => {
      await authApiRequest.logout().then((item) => {
        setTimeout(() => {
          ref.current = null
        }, 1000)
        router.push('/login')
      })
    }
    fetch()
  }, [router, refreshForomUrl, ref, accessForomUrl])
  return <LoadingNetflix />
}
