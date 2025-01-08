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
import {useTransition} from 'react'
import {Button} from '@/components/ui/button'
import {SignupSchema} from '@/lib/schemas'
import Link from 'next/link'
import authApiRequest from '@/apiRequest/auth'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {setCookieLocal} from '@/lib/utils'

interface propsLogin {
  email: string
}
export default function FormSignup({lang}: any) {
  const router = useRouter()
  const [isPending, setTransition] = useTransition()

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  })
  function handleCheckMail(values: propsLogin) {
    setTransition(async () => {
      try {
        const {payload, status} = await authApiRequest.checkMail(values)
        if (status === 200) {
          setCookieLocal('emailSignup', values.email)
          if (payload?.data?.resultCode === 500) {
            return router.push('/signup/password')
          }
          if (payload?.data?.resultCode === 100) {
            return router.push('/signup/regform')
          }
          return router.push('/login')
        }
        toast.error(`Email không hợp lệ`)
      } catch (error: any) {
        console.log(error)
        toast.error(`Email không hợp lệ`)
      }
    })
  }
  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    handleCheckMail(values)
  }
  return (
    <div className='max-w-[30rem] w-full mx-auto flex justify-center py-12 px-[4.25rem] flex-col relative top-[6rem] xsm:top-[4.5rem] z-30 text-white sm:bg-[rgba(0,0,0,0.7)] xsm:px-4 xsm:py-0'>
      <h1 className='xsm:text-sm'>
        Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
        thành viên của bạn.
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='!space-y-[1.5rem] xsm:mt-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='space-y-[0.5rem] text-white'>
                <FormLabel className='xsm:hidden text-[#666] lining-nums proportional-nums text-[1rem] font-normal leading-[1.2] tracking-[0.0125rem] xsm:text-sm not-italic xsm:tracking-[0.01094rem]'>
                  Email address*
                </FormLabel>
                <FormControl>
                  <Input
                    tabIndex={1}
                    spellCheck='false'
                    className='text-white placeholder:text-[#A3A3A3] rounded-none text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] border-[#8c8c8c] h-[3rem]'
                    placeholder='Email'
                    {...field}
                  />
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
              Đăng ký
            </Button>
          </div>
        </form>
      </Form>
      <div className='flex items-center w-fit mx-auto space-x-[0.56rem] mt-[1.67rem] xsm:mt-8 xsm:mb-4'>
        <span className='text-gray-400 text-[1rem] font-medium leading-normal tracking-[-0.016rem] xsm:text-xs not-italic xsm:leading-[150%] xsm:tracking-[-0.012rem]'>
          Bạn đã có tài khoản Netflix?
        </span>
        <Link
          className='text-white text-[1rem] font-medium leading-normal tracking-[-0.016rem] xsm:text-xs not-italic xsm:leading-[150%] xsm:tracking-[-0.012rem]'
          href={`/login`}
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}
