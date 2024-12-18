/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import movieApiRequest from '@/apiRequest/movie'
import dynamic from 'next/dynamic'
import ListMovieType from '@/sections/home/ListMovieType'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import React, {Fragment} from 'react'
const Banner = dynamic(() => import('@/sections/home/Banner'))

export default async function HomePage({
  params,
}: {
  params: {
    lang: string
    id: string | number
  }
}) {
  // Lấy access token từ cookie
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    // Nếu không có token, chuyển hướng về trang đăng nhập
    redirect('/login')
  }

  try {
    // Fetch dữ liệu song song từ API
    const [resGenreId, resBanner] = await Promise.all([
      movieApiRequest.SgenreID('genres2', accessToken),
      movieApiRequest.Sbanner(accessToken),
    ])

    // Kiểm tra status trả về để xác định lỗi
    if (resGenreId.status !== 200 || resBanner.status !== 200) {
      console.error('API Error:', {
        genreError: resGenreId.status,
        bannerError: resBanner.status,
      })
      redirect('/login') // Redirect về login nếu lỗi xác thực
    }

    // Lấy dữ liệu payload
    const dataBanner = resBanner?.payload?.data || []
    const dataGenre = resGenreId?.payload?.data || []

    return (
      <Fragment>
        {/* Component Banner */}
        <Banner dataBanner={dataBanner} />

        {/* Component ListMovieType */}
        <ListMovieType
          idGenre='home'
          dataGenre={dataGenre}
        />
      </Fragment>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    // Redirect về login nếu xảy ra lỗi bất ngờ
    return (
      <div className='error-container'>
        <h1>Oops! Có lỗi xảy ra</h1>
        <p>Hãy quay lại sau.</p>
      </div>
    )
  }
}
