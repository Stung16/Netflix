'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {EyeOff} from 'lucide-react'
import {Eye} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {useRouter} from 'next/navigation'
import authApiRequest from '@/apiRequest/auth'
import {toast} from 'sonner'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {LoginSchema} from '@/lib/schemas'
import Link from 'next/link'
type FormData = {
  email: string
  password: string
}

export default function SignupPass({t}: any) {
  const [isPending, startTransition] = useTransition()
  const [show, setShow] = useState<boolean>(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  })

  function handleLogin(values: {email: string; password: string}) {
    startTransition(async () => {
      try {
        const {status} = await authApiRequest.signup(values)
        if (status === 200) {
          toast.success(t.alerts.loginSuccess)
          router.push('/signup/planform')
        } else {
          toast.error(t.alerts.accountNotMatch)
        }
      } catch (error: any) {
        if (error.status === 400) {
          toast.error(error?.payload?.error?.message || t.alerts.userEX)
        } else {
          toast.error(t.alerts.someThingErr)
        }
      }
    })
  }

  const onSubmit = (data: FormData) => {
    if (!data) return
    handleLogin(data)
  }
  return (
    <div className='max-w-md mx-auto p-4 space-y-4 top-[8rem] border rounded-md shadow-md relative bg-white z-50'>
      {/* Tiêu đề */}
      <h1 className='text-2xl font-bold text-gray-900'>
        {t.orther.WelcomeBack}
        <br />
        {t.orther.JoinEz}
      </h1>

      {/* Phụ đề */}
      <p className='text-sm text-gray-700'>{t.orther.enterPassAndSeeNow}</p>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='space-y-[0.5rem] text-white'>
                <FormLabel className='xsm:hidden text-[#666] lining-nums proportional-nums text-[1rem] font-normal leading-[1.2] tracking-[0.0125rem] xsm:text-sm not-italic xsm:tracking-[0.01094rem]'>
                  {t.AuthLayout.Login.email}
                </FormLabel>
                <FormControl>
                  <Input
                    tabIndex={1}
                    spellCheck='false'
                    className='text-black placeholder:text-[#A3A3A3] rounded-none text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] border-[#8c8c8c] h-[3rem]'
                    placeholder='Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='xsm:text-[0.6rem text-[0.875rem] font-medium leading-[1.2] -tracking-[0.014rem]' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem className='space-y-[0.5rem] !mb-[2.5rem]'>
                <FormLabel className='text-[#666] xsm:hidden lining-nums proportional-nums text-[1rem] font-normal leading-[1.2] tracking-[0.0125rem] xsm:text-sm not-italic xsm:tracking-[0.01094rem]'>
                  {t.AuthLayout.Login.password}
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      tabIndex={2}
                      spellCheck='false'
                      type={`${show ? 'text' : 'password'}`}
                      className='text-black placeholder:text-[#A3A3A3] rounded-none text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] border-[#8c8c8c] h-[3rem]'
                      placeholder={t.AuthLayout.Login.placephoder.passLogin}
                      {...field}
                    />
                    <span
                      className='absolute top-1/2 right-3 -translate-y-1/2 size-6 xsm:hidden'
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <Eye className='size-6' />
                      ) : (
                        <EyeOff className='size-6' />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage className='text-[0.875rem] xsm:text-[0.6rem] font-medium leading-[1.2] -tracking-[0.014rem]' />
              </FormItem>
            )}
          />

          {/* Quên mật khẩu */}
          {/* Nút Tiếp Theo */}
          <Button
            type='submit'
            className='w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700'
          >
            {isPending && (
              <div className='border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid  mr-[0.5rem] animate-spin' />
            )}
            {t.button.continue}
          </Button>
          <div className='flex items-center w-fit mx-auto space-x-[0.56rem] mt-[1.67rem] xsm:mt-8 xsm:mb-4'>
            <span className='text-gray-400 text-[1rem] font-medium leading-normal tracking-[-0.016rem] xsm:text-xs not-italic xsm:leading-[150%] xsm:tracking-[-0.012rem]'>
              {t.title.HasAccountNetflix}
            </span>
            <Link
              className='text-[#333] text-[1rem] font-medium leading-normal tracking-[-0.016rem] xsm:text-xs not-italic xsm:leading-[150%] xsm:tracking-[-0.012rem]'
              href={`/login`}
            >
              {t.AuthLayout.Login.login}!
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
