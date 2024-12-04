/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/lib/http'

const paymentRequest = {
  payment: () => http.post<any>('/payment', null),
  check_transaction: () => http.get<any>('/transaction-status'),
}
export default paymentRequest
