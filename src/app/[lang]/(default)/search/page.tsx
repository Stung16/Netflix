/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ListFavorite from '@/components/movie/listFavorite/page'
import movieApiRequest from '@/apiRequest/movie'
import {cookies} from 'next/headers'
import React, {Fragment} from 'react'
import ListSearch from '@/components/movie/listSearch/page'
import getDictionary from '@/app/dictionaries'

export default async function page({
  searchParams,
  params,
}: {
  searchParams: {
    q: string
  }
  params: {
    lang: string
  }
}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  if (searchParams.q.length === 1) {
    return
  }

  try {
    const [resSearch, t] = await Promise.all([
      movieApiRequest.Ssearch(accesstoken, searchParams.q),
      getDictionary(params.lang),
    ])
    const dataSearch = resSearch.payload?.data

    return (
      <section className='text-white mt-12 pt-6 text-3xl px-[3.75rem] '>
        {/* listFavorite */}
        <div className='pt-[5rem]'>
          <ListSearch
            t={t}
            dataPlaylist={dataSearch?.movies}
            favoriteMovies={dataSearch?.idMovieFavorite}
          />
        </div>
      </section>
    )
  } catch (error: any) {
    return (
      <section className='text-white mt-12 text-lg flex justify-center pt-12'>
        <div>
          <p>
            Không có kết quả nào khớp với yêu cầu tìm kiếm &quot;
            {searchParams.q}
            &quot; của bạn.
          </p>
          <p className='mt-4'>Đề xuất:</p>
          <ul className='list-disc list-inside ml-6 mt-4'>
            <li>Thử nhập từ khóa khác</li>
            <li>Bạn đang tìm phim hoặc chương trình truyền hình?</li>
            <li>
              Thử sử dụng tên phim, chương trình truyền hình, tên diễn viên hoặc
              đạo diễn
            </li>
            <li>
              Thử một thể loại, như hài, lãng mạn, thể thao hoặc phim chính kịch
            </li>
          </ul>
        </div>
      </section>
    )
  }
}
