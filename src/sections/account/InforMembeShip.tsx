/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, {useState, useTransition} from 'react'
import {Skeleton} from '@/components/ui/skeleton'
import {
  cn,
  formatPhoneNumber,
  getNextPaymentDate,
  propService,
} from '@/lib/utils'
import useStore from '@/app/(store)/profile'
import Image from 'next/image'
import PopUpAlert from '@/components/popUps/PopUpAlert'
import authApiRequest from '@/apiRequest/auth'
import {toast} from 'sonner'

export default function InforMembeShip({t}: any) {
  const {profile} = useStore((state) => state)
  const [open, setOpent] = useState<boolean>(false)
  const [isPending, setTransition] = useTransition()

  const getServiceTitle = (subscriptionId: keyof propService) => {
    switch (subscriptionId) {
      case 'premium':
        return t.orther.plans.premium
      case 'standard':
        return t.orther.plans.standard
      case 'basic':
        return t.orther.plans.basic
      case 'phone':
        return t.orther.plans.phone
      default:
        return ''
    }
  }
  const handleDestroySubs = () => {
    setTransition(async () => {
      try {
        const {status} = await authApiRequest.destroySubscription()
        if (status === 200) {
          await authApiRequest.logout()
          toast.success(t.alerts.success)
          toast.warning(t.alerts.LoginAgain)
        }
      } catch (error: any) {
        console.log(error)
        toast.error(t.alerts.someThingErr)
      } finally {
        setOpent(false)
      }
    })
  }
  return (
    <div className='mt-4 flex flex-col space-y-4'>
      {/* Membership Details */}
      <div className='py-4 border rounded-lg'>
        <div className='flex flex-col'>
          <div className='px-4 xsm:px-2 flex flex-col space-y-2'>
            {profile ? (
              <h2 className='text-xl font-semibold xsm:text-base'>
                {getServiceTitle(
                  profile?.subscriptions_id as keyof propService,
                )}
              </h2>
            ) : (
              <Skeleton className='h-5 w-[10rem] xsm:w-[6rem]' />
            )}
            {profile ? (
              <p className='text-gray-600 xsm:text-[0.6rem]'>
                {t.orther.inforQuality}
              </p>
            ) : (
              <Skeleton className='h-5 w-[10rem] xsm:w-[6rem]' />
            )}
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className='xsm:p-2 p-4 border rounded-lg'>
        <h2 className='text-lg font-semibold mb-2 xsm:text-sm'>
          {t.orther.inforPayment}
        </h2>
        <div className='border-b pb-4'>
          <div className='mb-4'>
            <h3 className='text-gray-800 font-medium xsm:text-sm'>
              {t.orther.nextPayment}
            </h3>
            {profile ? (
              <p className='text-gray-600 xsm:text-[0.6rem]'>
                {getNextPaymentDate(profile?.transactions[0]?.updated_at)}
              </p>
            ) : (
              <Skeleton className='h-5 w-[15rem]' />
            )}
            <div className='flex items-center space-x-2'>
              <Image
                alt=''
                src={'/images/MOMOPAY.png'}
                width={100}
                height={100}
                className='w-6 h-4'
              />
              {profile ? (
                <p className='text-gray-600 font-medium xsm:text-[0.6rem]'>
                  {formatPhoneNumber(profile?.phone.toString())}
                </p>
              ) : (
                <Skeleton className='h-5 w-[8rem]' />
              )}
            </div>
          </div>
          <ul>
            <li>
              <button className='w-full text-gray-800 py-2 sm:px-4 xsm:text-[0.6rem] rounded-lg text-left hover:bg-gray-200'>
                {t.orther.viewPaymentHistory}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Cancel Membership */}
      <div className='sm:p-4'>
        <button
          onClick={() => setOpent(true)}
          disabled={isPending}
          className={cn(
            'w-full bg-red-100 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-200 xsm:text-[0.6rem]',
            isPending && 'pointer-events-none',
          )}
        >
          {t.button.destroyMemberShip}
        </button>
      </div>
      <PopUpAlert
        t={t}
        open={open}
        setOpen={setOpent}
        text={{title: t.alerts.title, subTitle: t.alerts.subTitle}}
        isPending={isPending}
        handleContinue={handleDestroySubs}
      />
    </div>
  )
}
