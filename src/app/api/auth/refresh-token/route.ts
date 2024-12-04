/* eslint-disable @typescript-eslint/no-unused-vars */
import authApiRequest from '@/apiRequest/auth'
import jwt from 'jsonwebtoken'

import {cookies} from 'next/headers'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: Request) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value
  if (!refreshToken) {
    return Response.json(
      {
        message: 'không tìm thấy refresh token',
      },
      {
        status: 401,
      },
    )
  }
  try {
    const {payload} = await authApiRequest.sRefreshToken({
      refreshToken,
    })
    const decodeAccesstoken = jwt.decode(payload.data.accessToken) as {
      exp: number
    }
    const decodeRefreshtoken = jwt.decode(payload.data.refreshToken) as {
      exp: number
    }
    cookieStore.set('accessToken', payload.data.accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodeAccesstoken.exp * 1000,
    })
    cookieStore.set('refreshToken', payload.data.refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodeRefreshtoken.exp * 1000,
    })
    return Response.json(payload)
  } catch (error: any) {
    return Response.json(
      {
        message: error.message ?? 'có lỗi xảy ra',
      },
      {
        status: 401,
      },
    )
  }
}
