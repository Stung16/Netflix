'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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
import {SignupSchema} from '@/lib/schemas'
import {useTransition} from 'react'
import {Button} from '@/components/ui/button'
import authApiRequest from '@/apiRequest/auth'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'

interface propsForgot {
  email: string
}

export default function FormForgotPass({t}: any) {
  const router = useRouter()
  const [isPending, setTransition] = useTransition()
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  })
  function handleForgot(values: propsForgot) {
    setTransition(async () => {
      try {
        const {status} = await authApiRequest.forgotPass(values)
        if (status === 200) {
          toast.success(t.schema.checkmail)
          return router.push('/login')
        } else {
          toast.error(t.schema.emailNotExit)
        }
      } catch (error: any) {
        console.log(error)
        toast.error(t.schema.emailNotExit)
      }
    })
  }

  function onSubmit(values: propsForgot) {
    handleForgot(values)
  }

  return (
    <div className='max-w-[30rem] w-full mx-auto flex justify-center py-12 px-[4.25rem] flex-col relative top-[6rem] xsm:top-[4.5rem] z-30 text-white sm:bg-[rgba(0,0,0,0.7)] xsm:px-4 xsm:py-0'>
      <h1 className='xsm:text-sm'>{t.title.forgotPas}</h1>
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
                  {t.AuthLayout.Login.email}
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
                <FormMessage className='xsm:text-[0.6rem text-[0.875rem] font-medium leading-[1.2] -tracking-[0.014rem]' />
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
              {t.button.sendMail}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
