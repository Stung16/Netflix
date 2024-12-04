/* eslint-disable @typescript-eslint/no-explicit-any */
import movieApiRequest from '@/apiRequest/movie'
import ListFavorite from '@/components/movie/listFavorite/page'
import {cookies} from 'next/headers'

export default async function page() {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  const [resFavorite] = await Promise.all([
    movieApiRequest.SgetFavorites(accesstoken),
  ])
  const dataFavorites = resFavorite.payload?.data
  return (
    <section className='text-white mt-12 pt-6 text-3xl px-[3.75rem] '>
      <h1>Danh sách của tôi</h1>
      {/* listFavorite */}
      <ListFavorite dataFavorites={dataFavorites} />
    </section>
  )
}
