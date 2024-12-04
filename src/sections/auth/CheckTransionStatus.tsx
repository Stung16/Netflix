'use client'
import paymentRequest from '@/apiRequest/payment'
import LoadingNetflix from '@/components/Loading/LoadingNetflix'
import {useRouter} from 'next/navigation'
import React, {useLayoutEffect} from 'react'

export default function CheckTransionStatus() {
  const router = useRouter()
  useLayoutEffect(() => {
    const fetch = async () => {
      try {
        const res = await paymentRequest.check_transaction()
        console.log(res)
        if (res.status === 200) {
          if (res.payload?.data?.resultCode === 0) {
            return router.push('/')
          }
          return router.push('/signup/planform')
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log(error)
        return router.push('/signup/planform')
      }
    }
    fetch()
  }, [router])
  return <LoadingNetflix />
}
