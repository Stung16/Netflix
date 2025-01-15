'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import PlanCard from '@/components/cards/PlanCard'
import {plans} from '@/lib/constants'
import {getCookieLocal, setCookieLocal} from '@/lib/utils'
import Link from 'next/link'
import React, {useLayoutEffect, useState} from 'react'

export default function Plans({t}: any) {
  const [selectedPlan, setSelectedPlan] = useState<number | string>(0) // Gói được chọn mặc định

  const handlePlanSelect = (planTitle: string) => {
    setSelectedPlan(planTitle)
  }
  useLayoutEffect(() => {
    const option = getCookieLocal('option') // Retrieve the stored option
    if (option) {
      setSelectedPlan(JSON.parse(option).index) // Parse the stored JSON string
    } else {
      setCookieLocal('option', JSON.stringify(plans[0])) // Store the default plan
    }
  }, [])
  return (
    <div className='max-w-6xl mx-auto p-12 relative z-30 bg-gray-300 top-[10rem]'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        {t.title.ChooseService}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
        {plans.map((plan: any, indexx: number) => (
          <PlanCard
            key={indexx}
            {...plan}
            t={t}
            isSelected={selectedPlan === plan.index}
            onClick={() => {
              handlePlanSelect(plan.index)
              setCookieLocal('option', JSON.stringify(plan))
            }}
          />
        ))}
      </div>
      <div className='mt-6 text-center'>
        <Link
          href={'paymentPicker'}
          className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md'
        >
          {t.button.continue}
        </Link>
      </div>
    </div>
  )
}
