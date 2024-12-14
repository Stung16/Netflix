/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/lib/http'

const acountApiRequest = {
  me: () => http.get<any>('/profile'),
  Sme: (accessToken: string | undefined) =>
    http.get<any>('/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  SChangePass: (body: {
    confirm_password: string
    new_password: string
    current_password: string
  }) => http.post<any>('/change-pass', body),
}
export default acountApiRequest
