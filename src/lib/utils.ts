/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import http, {EntityError} from '@/lib/http'
import {clsx, type ClassValue} from 'clsx'
import {UseFormSetError} from 'react-hook-form'
import jwt from 'jsonwebtoken'
import {toast} from 'sonner'
import {twMerge} from 'tailwind-merge'
import authApiRequest from '@/apiRequest/auth'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
export const handleErrorApi = ({
  error,
  setError,
  errHandle,
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
  errHandle?: string
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message,
      })
    })
  } else {
    toast.error(
      `${(errHandle || error?.payload?.message) ?? 'Lỗi không xác định'}`,
    )
  }
}
const isBrower = typeof window !== 'undefined'
//
export const getAccessFromLocalStorage = () =>
  isBrower ? localStorage.getItem('accessToken') : null
export const getRefreshFromLocalStorage = () =>
  isBrower ? localStorage.getItem('refreshToken') : null
//
export const getOrderIdFromLocalStorage = () =>
  isBrower ? localStorage.getItem('orderId') : null
//
export const setAccessFromToLocalStorage = (value: string) =>
  isBrower && localStorage.setItem('accessToken', value)
//
export const setRefreshFromToLocalStorage = (value: string) =>
  isBrower && localStorage.setItem('refreshToken', value)
//
export const setOrderIdToLocalStorage = (value: string) =>
  isBrower && localStorage.setItem('orderId', value)
//
export const removeTokenFromLocalStorage = () => {
  isBrower && localStorage.removeItem('accessToken')
  isBrower && localStorage.removeItem('refreshToken')
}
//
export const setCookieLocal = (name: string, value: string) =>
  isBrower &&
  Cookies.set(name, value, {
    expires: 1, // 5 phút
  })
//
export const getCookieLocal = (name: string) => isBrower && Cookies.get(name)
//
export const checkAuthRefreshToken = async (param?: {
  onError?: () => void
  onSuccess?: () => void
}) => {
  const accessToken = getAccessFromLocalStorage()
  const refreshToken = getRefreshFromLocalStorage()
  if (!accessToken || !refreshToken) return
  const decodeAccesstoken = jwt.decode(accessToken) as {
    exp: number
    iat: number
  }
  const decodeRefreshtoken = jwt.decode(refreshToken) as {
    exp: number
    iat: number
  }
  const now = new Date().getTime() / 1000 - 1
  if (decodeRefreshtoken.exp <= now) {
    removeTokenFromLocalStorage()
    return param?.onError && param.onError()
  }
  if (
    decodeAccesstoken.exp - now <
    (decodeAccesstoken.exp - decodeAccesstoken.iat) / 3
  ) {
    try {
      const res = await authApiRequest.refreshToken()
      setAccessFromToLocalStorage(res.payload.data.accessToken)
      setRefreshFromToLocalStorage(res.payload.data.refreshToken)
      param?.onSuccess && param.onSuccess()
    } catch (error) {
      console.log(error)
      param?.onError && param.onError()
    }
  }
}

//
//
export const fetcher = async (url: string) => {
  try {
    const res = await http.get(url)
    if (!res.payload) {
      throw new Error('No data in payload')
    }
    return res.payload
  } catch (error: any) {
    console.error('Fetcher Error:', error.message)
    throw error // SWR sẽ nhận lỗi và trả về trong `error`
  }
}

export const getYear = (dateString: string) => {
  return new Date(dateString).getFullYear()
}

export function convertDateToMembership(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Tháng bắt đầu từ 0

  // Chuyển đổi tháng thành chuỗi
  return `Thành viên từ tháng ${month} năm ${year}`
}
export interface propService {
  premium: string
  standard: string
  basic: string
  phone: string
}

export const listService: propService = {
  premium: 'Gói cao cấp',
  standard: 'Gói tiêu chuẩn',
  basic: 'Gói cơ bản',
  phone: 'Gói di động',
}

export function getNextPaymentDate(dateString: string) {
  const date = new Date(dateString)

  // Thêm 1 tháng
  date.setMonth(date.getMonth() + 1)

  // Định dạng ngày tháng
  const options: any = {month: 'long', day: 'numeric', year: 'numeric'}
  const formattedDate = date.toLocaleDateString('vi-VN', options)

  return formattedDate
}
export function formatPhoneNumber(phoneNumber: string = '000000000') {
  // Loại bỏ các ký tự không phải số
  const numericPhoneNumber = phoneNumber?.replace(/\D/g, '')

  // Lấy 3 chữ số cuối cùng
  const lastThreeDigits = numericPhoneNumber?.slice(-3)

  // Tạo chuỗi ẩn danh với phần còn lại là dấu sao
  const maskedPhoneNumber =
    '*'.repeat(numericPhoneNumber?.length - 3) + lastThreeDigits

  return maskedPhoneNumber
}
