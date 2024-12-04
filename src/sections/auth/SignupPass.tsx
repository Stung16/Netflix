/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, {useLayoutEffect, useState, useTransition} from 'react'
import {useForm} from 'react-hook-form'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {getCookieLocal} from '@/lib/utils'
import {useRouter} from 'next/navigation'
import authApiRequest from '@/apiRequest/auth'
import {toast} from 'sonner'

type FormData = {
  password: string
}

export default function SignupPass() {
  const [email, setEmail] = useState<string | null>(null)
  const [isPending, setTransition] = useTransition()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>()
  function handleLogin(values: {email: string; password: string}) {
    setTransition(async () => {
      try {
        const {payload, status} = await authApiRequest.login(values)
        if (status === 200) {
          if (payload?.data?.resultCode === 500) {
            return router.push('/signup/planform')
          }
          if (payload?.data?.resultCode === 0) {
            return router.push('/')
          }
        }
        toast.error(`Tài khoản hoặc mật khẩu không đúng!`)
      } catch (error: any) {
        console.log(error)
        toast.error(`Tài khoản hoặc mật khẩu không đúng!`)
      }
    })
  }

  const onSubmit = (data: FormData) => {
    const emailLocal = getCookieLocal('emailSignup')
    if (!emailLocal) return router.push('/signup')

    handleLogin(
      Object.assign(data, {
        email: emailLocal,
      }),
    )
  }
  useLayoutEffect(() => {
    const storedEmail = getCookieLocal('emailSignup')
    if (!storedEmail) {
      router.push('/signup')
    } else {
      setEmail(storedEmail)
    }
  }, [router])

  return (
    <div className='max-w-md mx-auto p-4 space-y-4 top-[8rem] border rounded-md shadow-md relative bg-white z-50'>
      {/* Tiêu đề */}
      <h1 className='text-2xl font-bold text-gray-900'>
        Chào mừng bạn quay lại!
        <br />
        Tham gia Netflix thật đơn giản.
      </h1>

      {/* Phụ đề */}
      <p className='text-sm text-gray-700'>
        Chỉ cần nhập mật khẩu và bạn sẽ được xem ngay lập tức.
      </p>

      {/* Email */}
      <p className='text-sm text-gray-800 font-semibold'>
        Email: <span>{email}</span>
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4'
      >
        {/* Nhập mật khẩu */}
        <div>
          <Label htmlFor='password'>Mật khẩu</Label>
          <Input
            id='password'
            type='password'
            placeholder='Nhập mật khẩu'
            {...register('password', {
              required: 'Mật khẩu không được để trống',
            })}
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
        </div>

        {/* Quên mật khẩu */}
        <div>
          <a
            href='#'
            className='text-sm text-blue-600 hover:underline'
          >
            Bạn quên mật khẩu?
          </a>
        </div>

        {/* Nút Tiếp Theo */}
        <Button
          type='submit'
          className='w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700'
        >
          {isPending && (
            <div className='border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid  mr-[0.5rem] animate-spin' />
          )}
          Tiếp theo
        </Button>
      </form>
    </div>
  )
}
