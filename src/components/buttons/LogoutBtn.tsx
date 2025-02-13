/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import authApiRequest from '@/apiRequest/auth'
import {Button} from '@/components/ui/button'
import {toast} from 'sonner'
import {useRouter} from 'next/navigation'

export default function LogoutBtn() {
  const router = useRouter()

  async function handleLogout() {
    try {
      await authApiRequest.logout()
      toast.success('Logout success!')
    } catch (error: any) {
      console.log(error)
      toast.success('Logout success!')
    } finally {
      router.push('/login')
      router.refresh()
    }
  }
  return (
    <div className='absolute top-8 right-[11.5rem] z-50 xsm:top-4 xsm:right-4'>
      <Button
        onClick={handleLogout}
        className='bg-gray-200'
      >
        Đăng xuất
      </Button>
    </div>
  )
}
