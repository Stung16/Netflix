/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {Loader2} from 'lucide-react'
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
import {Button} from '@/components/ui/button'
import {changePassSchema} from '@/lib/schemas'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {useTransition} from 'react'
import acountApiRequest from '@/apiRequest/account'
import {cn} from '@/lib/utils'

interface PropsChangePass {
  current_password: string
  new_password: string
  confirm_password: string
}

export default function Password() {
  const router = useRouter()
  const [isPending, setTransition] = useTransition()

  const form = useForm<z.infer<typeof changePassSchema>>({
    resolver: zodResolver(changePassSchema),
  })

  const onSubmit = (data: PropsChangePass) => {
    setTransition(async () => {
      try {
        const {payload, status} = await acountApiRequest.SChangePass(data)
        if (status === 200) {
          toast.success(`Cập nhật mật khẩu thành công!`)
        }
      } catch (error: any) {
        console.log(error)
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại!')
      }
    })
  }

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Thay đổi mật khẩu</h1>
        <p className='text-gray-600 mb-6'>
          Bảo vệ tài khoản của bạn bằng một mật khẩu duy nhất dài ít nhất 6 ký
          tự.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='current_password'
              render={({field}) => (
                <FormItem className='mb-4'>
                  <FormLabel className='block text-gray-700 font-medium mb-2'>
                    Mật khẩu hiện tại
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='new_password'
              render={({field}) => (
                <FormItem className='mb-4'>
                  <FormLabel className='block text-gray-700 font-medium mb-2'>
                    Mật khẩu mới (6-60 ký tự)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Nhập mật khẩu mới'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirm_password'
              render={({field}) => (
                <FormItem className='mb-4'>
                  <FormLabel className='block text-gray-700 font-medium mb-2'>
                    Nhập lại mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Nhập lại mật khẩu mới'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-500' />
                </FormItem>
              )}
            />

            <div className='flex justify-between'>
              <Button
                disabled={isPending}
                type='submit'
                className={
                  'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                }
              >
                {isPending && <Loader2 className='animate-spin' />}
                {isPending ? 'Vui lòng đợi' : 'Lưu'}
              </Button>
              <Button
                type='button'
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
                onClick={() => router.push('/account')}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
