/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/lib/http'

const authApiRequest = {
  refreshTokenRequest: null as Promise<any> | null,
  sLogin: (body: any) => http.post<any>('/login', body),
  login: (body: any) => http.post<any>('/api/auth/login', body, {baseUrl: ''}),
  sSignup: (body: any) => http.post<any>('/signup', body),
  signup: (body: any) =>
    http.post<any>('/api/auth/signup', body, {baseUrl: ''}),
  sLogout: (body: {refreshToken: string; accessToken: string}) =>
    http.post<any>(
      '/logout',
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      },
    ),
  logout: () => http.post<any>('/api/auth/logout', null, {baseUrl: ''}),
  sRefreshToken: (body: any) => http.post<any>('/refreshToken', body),
  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest
    }
    this.refreshTokenRequest = http.post<any>('/api/auth/refresh-token', null, {
      baseUrl: '',
    })
    const result = await this.refreshTokenRequest
    this.refreshTokenRequest = null
    return result
  },
  checkMail: (body: any) => http.post<any>('/check-mail', body),
}
export default authApiRequest
