import {z} from 'zod'
export const OtpSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
})
export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'New Password must be at least 8 characters long',
  }),
  toastError: z.string().optional(),
})
export const SignupSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})
export const changePassSchema = z
  .object({
    current_password: z.string().min(8, {
      message: 'Current Password must be at least 8 characters long',
    }),
    new_password: z.string().min(8, {
      message: 'New Password must be at least 8 characters long',
    }),
    confirm_password: z.string().min(8, {
      message: 'Confirm Password must be at least 8 characters long',
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'New Password and Confirm Password must match',
    path: ['confirm_password'], // Đặt lỗi vào trường 'confirm_password'
  })
