import FormLogin from '@/sections/auth/FormLogin'

export default function page({params}: {params: {lang: string}}) {
  return <FormLogin lang={params.lang} />
}
