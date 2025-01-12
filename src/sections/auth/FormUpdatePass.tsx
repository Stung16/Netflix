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
interface PropsChangePass {
  current_password: string
  new_password: string
  confirm_password: string
}

export default function FormUpdatePass({t}: any) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='current_password'
          render={({field}) => (
            <FormItem className='mb-4'>
              <FormLabel className='block text-gray-700 font-medium mb-2 xsm:text-[0.6rem]'>
                {t.orther.currentPass}
              </FormLabel>
              <FormControl>
                <Input
                  className='xsm:text-[0.6rem]'
                  placeholder={t.orther.currentPass}
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
              <FormLabel className='block text-gray-700 font-medium mb-2 xsm:text-[0.6rem]'>
                {t.orther.NewPass} (6-60 ký tự)
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='xsm:text-[0.6rem]'
                  placeholder={t.orther.NewPass}
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
              <FormLabel className='block text-gray-700 font-medium mb-2 xsm:text-[0.6rem]'>
                {t.orther.res_Pass}
              </FormLabel>
              <FormControl>
                <Input
                  className='xsm:text-[0.6rem]'
                  type='password'
                  placeholder={t.orther.res_Pass}
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
              'bg-blue-500 text-white xsm:text-[0.6rem] px-4 xsm:px-2 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }
          >
            {isPending && <Loader2 className='animate-spin' />}
            {isPending ? t.orther.pleaseWaite : t.button.save}
          </Button>
          <Button
            type='button'
            className='bg-gray-300 xsm:text-[0.6rem] text-gray-700 px-4 xsm:px-2 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
            onClick={() => router.back()}
          >
            {t.button.cancel}
          </Button>
        </div>
      </form>
    </Form>
  )
}
