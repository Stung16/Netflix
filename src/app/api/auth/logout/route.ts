/* eslint-disable @typescript-eslint/no-unused-vars */
import authApiRequest from '@/apiRequest/auth'

import {cookies} from 'next/headers'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: Request) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'không nhận được access và refresh token',
      },
      {
        status: 200,
      },
    )
  }
  try {
    const response = await authApiRequest.sLogout({
      accessToken,
      refreshToken,
    })

    return Response.json(response.payload)
  } catch (error) {
    return Response.json(
      {
        message: 'Lỗi kết nối với BE',
      },
      {
        status: 200,
      },
    )
  }
}
