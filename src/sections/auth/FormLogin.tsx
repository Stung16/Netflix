'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {useEffect, useState, useTransition} from 'react'
import ICHidePass from '@/components/icons/ICHidePass'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import authApiRequest from '@/apiRequest/auth'
import {useRouter, useSearchParams} from 'next/navigation'
import {toast} from 'sonner'
import {
  getCookieLocal,
  getDeviceInfo,
  removeTokenFromLocalStorage,
} from '@/lib/utils'

interface propsLogin {
  email: string
  password: string
}
export default function FormLogin({t}: any) {
  const LoginSchema = z.object({
    email: z.string().email({
      message: t.schema.email,
    }),
    password: z
      .string({
        message: t.schema.requied,
      })
      .min(8, {
        message: t.schema.password,
      }),
    toastError: z.string().optional(),
  })

  const searchParams = useSearchParams()
  const clearStorage = searchParams.get('clearStorage')
  const router = useRouter()
  const [show, setShow] = useState<boolean>(false)
  const [isPending, setTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: getCookieLocal('emailSignup') || '',
    },
  })
  function handleSignIn(values: propsLogin) {
    setTransition(async () => {
      try {
        const {payload, status} = await authApiRequest.login(values)

        if (status === 200) {
          if (!payload?.data?.account?.subscriptions) {
            router.push('/signup/planform')
          }
          if (payload?.data?.account?.subscriptions) {
            router.push('/')
            await authApiRequest.UpdateActive({
              device: getDeviceInfo(navigator.userAgent),
            })
          }
          toast.success(t.alerts.loginSuccess)
        }
      } catch (error: any) {
        console.log(error)
        toast.error(t.alerts.someThingErr)
      }
    })
  }

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    handleSignIn(values)
  }
  useEffect(() => {
    if (clearStorage === 'true') {
      removeTokenFromLocalStorage()
    }
  }, [router, clearStorage])
  return (
    <div className='max-w-[30rem] w-full mx-auto flex justify-center py-12 px-[4.25rem] flex-col relative top-[6rem] xsm:top-[4.5rem] z-30 text-white sm:bg-[rgba(0,0,0,0.7)] xsm:px-4 xsm:py-0'>
      <h1 className='text-2xl xsm:text-[2rem] text-white font-medium'>
        {t.AuthLayout.Login.login}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='!space-y-[1.5rem] xsm:mt-4 font-netflix'
        >
          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='space-y-[0.5rem] text-white'>
                <FormLabel className='text-[#666] xsm:hidden lining-nums proportional-nums text-[1rem] font-normal leading-[1.2] tracking-[0.0125rem] xsm:text-sm not-italic xsm:tracking-[0.01094rem]'>
                  {t.AuthLayout.Login.email}
                </FormLabel>
                <FormControl>
                  <Input
                    tabIndex={1}
                    spellCheck='false'
                    className='text-white placeholder:text-[#A3A3A3] rounded-none text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] border-[#8c8c8c] h-[3rem]'
                    placeholder={t.AuthLayout.Login.placephoder.emailLogin}
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-[0.875rem] xsm:text-[0.6rem] font-medium leading-[1.2] -tracking-[0.014rem]' />
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
                      className='text-white placeholder:text-[#A3A3A3] rounded-none text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] border-[#8c8c8c] h-[3rem]'
                      placeholder={t.AuthLayout.Login.placephoder.passLogin}
                      {...field}
                    />
                    <span
                      className='absolute top-1/2 right-3 -translate-y-1/2 size-6 xsm:hidden'
                      onMouseDown={() => {
                        setShow(true)
                      }}
                      onMouseUp={() => {
                        setShow(false)
                      }}
                    >
                      {!show && <ICHidePass className='size-6' />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage className='text-[0.875rem] xsm:text-[0.6rem] font-medium leading-[1.2] -tracking-[0.014rem]' />
              </FormItem>
            )}
          />
          <div className='h-[1.5rem] xsm:h-4 flex items-center justify-between'>
            <div
              // onClick={() => setOpent(true)}
              className='text-greyscaletext-5 cursor-pointer text-[0.875rem] font-medium leading-[1.2] tracking-[-0.014rem] underline xsm:text-[0.625rem] not-italic xsm:tracking-[0.00313rem]'
            >
              {t.AuthLayout.Login.forgotPas}
            </div>
            {/* <FormField
                control={form.control}
                name='remember'
                render={({ field }) => (
                  <FormItem className='flex items-center'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className='pl-[0.7rem] xsm:pl-1 text-greyscaletext-50 text-[0.75rem] font-helvetica font-medium tracking-[0.0075rem] xsm:text-[0.625rem] not-italic xsm:tracking-[0.00313rem]'>
                      Remember my details
                    </FormLabel>
                  </FormItem>
                )}
              /> */}
          </div>
          <div className='pt-[0.5rem] xsm:p-0'>
            <Button
              disabled={isPending}
              type='submit'
              className='w-full flex items-center py-[1.2rem] bg-[#e50914] rounded-sm'
            >
              {isPending && (
                <div className='border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid text-white mr-[0.5rem] animate-spin' />
              )}
              {t.AuthLayout.Login.login}
            </Button>
          </div>
          {form.formState.errors.toastError && (
            <p className='mt-2 text-center text-[0.875rem] font-medium leading-[1.2] -tracking-[0.014rem] text-red-500'>
              {form.formState.errors.toastError.message}
            </p>
          )}
        </form>
      </Form>
      <div className='flex items-center w-fit mx-auto space-x-[0.56rem] mt-[1.67rem] xsm:mt-8 xsm:mb-4'>
        <span className='text-gray-400 text-[1rem] font-medium leading-normal tracking-[-0.016rem] xsm:text-xs not-italic xsm:leading-[150%] xsm:tracking-[-0.012rem]'>
          {t.AuthLayout.Login.newJoin}
        </span>
        <Link
          className='text-white text-[1rem] font-medium leading-normal tracking-[-0.016rem] xsm:text-xs not-italic xsm:leading-[150%] xsm:tracking-[-0.012rem]'
          href={`/signup/password`}
        >
          {t.AuthLayout.Login.resgiternow}
        </Link>
      </div>
    </div>
  )
}
