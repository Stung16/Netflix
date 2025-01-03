/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {UAParser} from 'ua-parser-js'

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
  if (!accessToken || !refreshToken) {
    await authApiRequest.logout()
    return param?.onError && param.onError()
  }
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
export async function getIPAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error('Lỗi khi lấy địa chỉ IP:', error)
    return null
  }
}
interface BrowserInfo {
  name: string | null
  version: string | null
  engine: string | null
  engineVersion: string | null
}

interface OSInfo {
  name: string | null
  version: string | null
}

interface DeviceInfo {
  type: 'mobile' | 'desktop'
  name: string
}

interface DeviceDetectionResult {
  browser: BrowserInfo
  os: OSInfo
  device: DeviceInfo
}
export function getDeviceInfo(userAgent: string): DeviceDetectionResult {
  const parser = new UAParser(userAgent)
  const {browser, os} = parser.getResult()

  const isMobile = userAgent.toLowerCase().includes('mobi')
  const deviceType: DeviceInfo['type'] = isMobile ? 'mobile' : 'desktop'
  const deviceName = isMobile
    ? userAgent.includes('iPhone') || userAgent.includes('iPad')
      ? 'iPhone'
      : 'Samsung Galaxy S21'
    : os.name === 'Windows'
      ? 'Windows Desktop'
      : os.name === 'Mac OS'
        ? 'Mac Desktop'
        : 'Desktop'

  return {
    browser: {
      name: browser.name ?? null,
      version: browser.version ?? null,
      engine: parser.getEngine().name ?? null,
      engineVersion: parser.getEngine().version ?? null,
    },
    os: {
      name: os.name ?? null,
      version: os.version ?? null,
    },
    device: {
      type: deviceType,
      name: deviceName,
    },
  }
}
export function formatDateTime(isoDateTimeString: string) {
  const date = new Date(isoDateTimeString)

  // Lấy giờ và phút
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Lấy ngày, tháng, năm
  const day = date.getDate()
  const month = date.getMonth() + 1 // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear()

  // Chuyển đổi sang múi giờ GMT+7
  const offsetHours = 7
  const offsetMinutes = 0
  const offsetMilliseconds = (offsetHours * 60 + offsetMinutes) * 60 * 1000
  date.setTime(date.getTime() + offsetMilliseconds)

  // Định dạng kết quả
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} GMT+7 ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}

// Helper functions
const getAndroidDeviceName = (ua: string): string => {
  const androidDeviceNameMatch = ua
    .slice(ua.indexOf('Android'))
    .match(/; ([^;]+)\)/)
  return androidDeviceNameMatch
    ? androidDeviceNameMatch[1].trim().split(' ')[0]
    : 'Android'
}

const getIosDeviceName = (ua: string) => {
  const screenResolution = `${window.screen.width}x${window.screen.height}`
  return iosDeviceMapping.get(screenResolution) || 'iPhone'
}

const getDesktopDeviceName = (osName: string, platform: string): string => {
  return (
    desktopDeviceMapping.get(osName) ||
    desktopDeviceMapping.get(platform) ||
    'Unknown'
  )
}

const getWindowsDesktopName = (browserName: string, ua: string): string => {
  const windowsVersionMap: {[key: string]: string} = {
    '10.0': 'Windows 10',
    '6.3': 'Windows 8.1',
    '6.2': 'Windows 8',
    '6.1': 'Windows 7',
    '6.0': 'Windows Vista',
    '5.1': 'Windows XP',
    '5.0': 'Windows 2000',
  }

  const windowsVersion = ua.match(/Windows NT (\d+\.\d+)/)
  return windowsVersion
    ? windowsVersionMap[windowsVersion[1]] || 'Windows'
    : 'Windows'
}

const getMacDesktopName = (browserName: string, ua: string): string => {
  const macOSVersionMap: {[key: string]: string} = {
    '10.15': 'macOS Catalina',
    '10.14': 'macOS Mojave',
    '10.13': 'macOS High Sierra',
    '10.12': 'macOS Sierra',
    '10.11': 'OS X El Capitan',
    '10.10': 'OS X Yosemite',
    '10.9': 'OS X Mavericks',
    '10.8': 'OS X Mountain Lion',
    '10.7': 'OS X Lion',
    '10.6': 'OS X Snow Leopard',
    '10.5': 'OS X Leopard',
    '10.4': 'OS X Tiger',
    '10.3': 'OS X Panther',
    '10.2': 'OS X Jaguar',
    '10.1': 'OS X Puma',
    '10.0': 'OS X Cheetah',
  }

  const macOSVersion = ua.match(/Mac OS X (\d+\.\d+)/)
  return macOSVersion ? macOSVersionMap[macOSVersion[1]] || 'macOS' : 'macOS'
}

// Device mapping
const iosDeviceMapping = new Map([
  ['320x480', 'iPhone 4S, 4, 3GS, 3G, 1st gen'],
  ['320x568', 'iPhone 5, SE 1st Gen,5C, 5S'],
  ['375x667', 'iPhone SE 2nd Gen, 6, 6S, 7, 8'],
  ['375x812', 'iPhone X, XS, 11 Pro, 12 Mini, 13 Mini'],
  ['390x844', 'iPhone 13, 13 Pro, 14, 14 Plus'],
  [
    '414x896',
    'iPhone 11, 11 Pro Max, 12, 12 Pro, 13 Pro Max, 14 Pro, 14 Pro Max',
  ],
])

const desktopDeviceMapping = new Map([
  ['Windows', 'Windows'],
  ['Linux', 'Linux'],
  ['Macintosh', 'macOS'],
  ['iPhone', 'iPhone'],
  ['iPad', 'iPad'],
])
