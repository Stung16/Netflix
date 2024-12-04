/* eslint-disable @typescript-eslint/no-explicit-any */
import {SessionOptions} from 'iron-session'

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    'complex_password_at_least_32_characters_long',
  cookieName: 'myapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Chỉ bật secure trong môi trường production
  },
}

// Định nghĩa kiểu dữ liệu sẽ được lưu trong session
declare module 'iron-session' {
  interface IronSessionData {
    user?: any
  }
}
