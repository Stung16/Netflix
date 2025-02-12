'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useLayoutEffect, useState, useTransition} from 'react'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import Link from 'next/link'
import paymentRequest from '@/apiRequest/payment'
import {useRouter} from 'next/navigation'
import {getCookieLocal, setOrderIdToLocalStorage} from '@/lib/utils'

// Schema validate số điện thoại với Zod
const momoSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      'Invalid phone number. Please enter 9 to 11 digits.',
    ),
  isAgreed: z.boolean().refine((val) => val === true, {
    message: 'You need to agree to the terms to continue.',
  }),
})

type MomoFormValues = z.infer<typeof momoSchema>

export default function WalletOption({t}: any) {
  const router = useRouter()
  const [option, setOption] = useState<any>(null)
  const [isPending, setTransition] = useTransition()

  const form = useForm<MomoFormValues>({
    resolver: zodResolver(momoSchema),
    defaultValues: {
      phoneNumber: '',
      isAgreed: false,
    },
  })

  // Xử lý submit form
  const onSubmit = (data: MomoFormValues) => {
    setTransition(async () => {
      const {payload, status} = await paymentRequest.payment({
        service: option?.name,
        price: option?.price,
        phone: data.phoneNumber,
      })

      if (status === 200) {
        if (payload?.data?.resultCode === 0) {
          setOrderIdToLocalStorage(payload?.data?.orderId)
          return router.push(payload?.data?.payUrl)
        }
      }
    })
  }
  useEffect(() => {
    const option = getCookieLocal('option')
    if (option) {
      try {
        const parsedValue = JSON.parse(option)
        setOption(parsedValue)
      } catch (error: any) {
        return router.push('/signup/planform')
      }
    }
    if (!option) {
      return router.push('/signup/planform')
    }
  }, [router])

  return (
    <div className='max-w-[30rem] w-full mx-auto flex justify-center py-12 px-[4.25rem] flex-col relative top-[6rem] z-30 bg-white'>
      <div className='max-w-md mx-auto px-4'>
        <h2 className='text-2xl font-bold text-center mb-4'>
          {t.desc.WalletOptionMOMO}
        </h2>
        <p className='text-gray-600 mb-6'>{t.title.establishMOMO}</p>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            {/* Số điện thoại */}
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t.orther.phone}</FormLabel>
                  <div className='flex items-center border rounded-lg overflow-hidden'>
                    <span className='bg-gray-200 px-3 py-2 text-gray-700'>
                      +84
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        placeholder={t.orther.phone}
                        className='flex-1 px-3 py-2 border-none ring-0 focus-visible:ring-0 focus-visible:ring-transparent'
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phần hiển thị gói dịch vụ */}
            <div className='flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4'>
              <div>
                <p className='text-lg font-medium'>
                  {option?.price
                    ? `${option?.price.toLocaleString('vi-VN')} đ`
                    : 'loading...'}
                  /{t.orther.month}
                </p>
                <p className='text-sm text-gray-600'>
                  {option?.title ? option?.title : 'loading...'}
                </p>
              </div>
              <Link
                href={'planform'}
                className='text-blue-500 underline text-sm'
              >
                {t.orther.change}
              </Link>
            </div>

            {/* Điều khoản */}
            <FormField
              control={form.control}
              name='isAgreed'
              render={({field}) => (
                <FormItem>
                  <div className='flex items-start space-x-3'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <span className='text-sm text-gray-600'>
                      {t.orther.i_argee}{' '}
                      <a
                        href='#'
                        className='text-blue-500 underline'
                        onClick={() => alert('Mở điều khoản sử dụng')}
                      >
                        {t.orther.clause_use}
                      </a>{' '}
                      {t.orther.and}{' '}
                      <a
                        href='#'
                        className='text-blue-500 underline'
                        onClick={() => alert('Mở chính sách quyền riêng tư')}
                      >
                        {t.orther.privacyPolicy}
                      </a>
                      .
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nút kích hoạt */}
            <Button
              type='submit'
              className={`w-full py-3 bg-red-500 hover:bg-red-600`}
            >
              {isPending && (
                <div className='border-[#666] size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid  mr-[0.5rem] animate-spin' />
              )}
              {t.button.createMemberShip}
            </Button>
          </form>
        </Form>

        {/* Ghi chú */}
        <p className='text-sm text-gray-600 text-center mt-4'>
          {t.desc.notificationMoMo}
        </p>
      </div>
    </div>
  )
}
