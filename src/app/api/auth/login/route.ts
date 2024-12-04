import authApiRequest from '@/apiRequest/auth'
import {HttpError} from '@/lib/http'
import LoginBodyType from '@/lib/type'
import jwt from 'jsonwebtoken'

import {cookies} from 'next/headers'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType
  const cookieStore = cookies()
  try {
    const {payload} = await authApiRequest.sLogin(body)
    const {accessToken, refreshToken} = payload?.data
    const decodeAccesstoken = jwt.decode(accessToken) as {exp: number}
    const decodeRefreshtoken = jwt.decode(refreshToken) as {exp: number}
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodeAccesstoken.exp * 1000,
    })
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodeRefreshtoken.exp * 1000,
    })
    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      })
    } else {
      return Response.json(
        {
          message: 'có lỗi',
        },
        {
          status: 500,
        },
      )
    }
  }
}
