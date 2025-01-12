/* eslint-disable @typescript-eslint/no-explicit-any */
import movieApiRequest from '@/apiRequest/movie'
import getDictionary from '@/app/dictionaries'
import ListFavorite from '@/components/movie/listFavorite/page'
import {cookies} from 'next/headers'

export default async function page({
  params,
}: {
  params: {
    lang: string
  }
}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  const [resFavorite, t] = await Promise.all([
    movieApiRequest.SgetFavorites(accesstoken),
    getDictionary(params.lang),
  ])
  const dataFavorites = resFavorite.payload?.data
  return (
    <section className='text-white mt-12 pt-6 text-3xl px-[3.75rem] xsm:px-4'>
      <h1 className='xsm:text-base mb-4'>{t.title.myList}</h1>
      {/* listFavorite */}
      <ListFavorite
        dataFavorites={dataFavorites}
        t={t}
      />
    </section>
  )
}
