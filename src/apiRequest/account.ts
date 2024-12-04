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
}
export default acountApiRequest
