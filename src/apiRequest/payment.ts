/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/lib/http'

const paymentRequest = {
  payment: (body: {service: string; price: number; phone: string}) =>
    http.post<any>('/payment', body),
  check_transaction: () => http.get<any>('/transaction-status'),
}
export default paymentRequest
