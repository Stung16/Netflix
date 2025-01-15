import getDictionary from '@/app/dictionaries'
import FormLogin from '@/sections/auth/FormLogin'

export default async function page({params}: {params: {lang: string}}) {
  const [t] = await Promise.all([getDictionary(params.lang)])
  return <FormLogin t={t} />
}
