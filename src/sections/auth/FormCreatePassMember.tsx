/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Input} from '@/components/ui/input'
import {Fragment, useEffect, useState, useTransition} from 'react'
import {Button} from '@/components/ui/button'
import {LoginSchema} from '@/lib/schemas'
import authApiRequest from '@/apiRequest/auth'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {getCookieLocal} from '@/lib/utils'
import useStore from '@/app/(store)/profile'

interface propsLogin {
  email: string
  password: string
}
export default function FormCreatePassMember({lang}: any) {
  const {profile} = useStore((state) => state)

  const router = useRouter()
  const [isPending, setTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: getCookieLocal('emailSignup') || '',
    },
  })
  function handleCreateAccount(values: propsLogin) {
    setTransition(async () => {
      try {
        setTransition(async () => {
          try {
            const response = await authApiRequest.signup(values)
            if (response?.status === 200) {
              router.push('/signup/planform')
              toast.success('Successfully! ', {
                position: 'bottom-center',
              })
            }
          } catch (error: any) {
            console.log(error)

            toast.error(`Tài khoản hoặc mật khẩu không đúng!`)
          }
        })
      } catch (error: any) {
        console.log(error)

        toast.error(`Tài khoản hoặc mật khẩu không đúng!`)
      }
    })
  }

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    handleCreateAccount(values)
  }

  return (
    <div className='max-w-[30rem] w-full mx-auto flex justify-center py-12 px-[4.25rem] flex-col relative top-[6rem] z-30 text-white bg-[rgba(0,0,0,0.7)]'>
      {profile ? (
        <Fragment>
          <h1>{`Hi! ${profile?.name}`}</h1>
          <p className='mt-2'>
            Hãy hoàn tất thủ tục thanh toán để được xem phim
          </p>
          <Button
            onClick={() => router.push('/signup/planform')}
            className='mt-4'
          >
            Tiếp tục
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <span>Bước 1/3</span>
          <h1>Tạo mật khẩu để bắt đầu tư cách thành viên của bạn</h1>
          <p>Chỉ cần vài bước nữa là bạn sẽ hoàn tất!</p>
          <p>Chúng tôi cũng chẳng thích thú gì với các loại giấy tờ</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='!space-y-[1.5rem] mt-4'
            >
              <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem className='space-y-[0.5rem] text-white'>
                    <FormLabel className='text-[#666] lining-nums proportional-nums text-[1rem] font-normal leading-[1.2] tracking-[0.0125rem] xsm:text-sm not-italic xsm:tracking-[0.01094rem]'>
                      Email address*
                    </FormLabel>
                    <FormControl>
                      <Input
                        tabIndex={1}
                        spellCheck='false'
                        className='font-netflix text-white placeholder:text-[#A3A3A3] rounded-none text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] border-[#8c8c8c] h-[3rem]'
                        placeholder='Email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-[0.875rem] font-medium leading-[1.2] -tracking-[0.014rem]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({field}) => (
                  <FormItem className='space-y-[0.5rem] !mb-[2.5rem]'>
                    <FormLabel className='text-[#666] lining-nums proportional-nums text-[1rem] font-normal leading-[1.2] tracking-[0.0125rem] xsm:text-sm not-italic xsm:tracking-[0.01094rem]'>
                      Password*
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          tabIndex={2}
                          spellCheck='false'
                          type={'password'}
                          className='font-netflix text-white placeholder:text-[#A3A3A3] rounded-none text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] border-[#8c8c8c] h-[3rem]'
                          placeholder='Thêm mật khẩu'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-[0.875rem] font-medium leading-[1.2] -tracking-[0.014rem]' />
                  </FormItem>
                )}
              />
              <div className='pt-[0.5rem]'>
                <Button
                  disabled={isPending}
                  type='submit'
                  className='w-full flex items-center py-[1.2rem] bg-[#e50914] rounded-sm'
                >
                  {isPending && (
                    <div className='border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid  mr-[0.5rem] animate-spin' />
                  )}
                  Tiếp theo
                </Button>
              </div>
            </form>
          </Form>
        </Fragment>
      )}
    </div>
  )
}
