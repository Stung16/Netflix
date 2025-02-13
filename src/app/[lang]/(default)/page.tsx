import movieApiRequest from '@/apiRequest/movie'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import React from 'react'
import getDictionary from '@/app/dictionaries'
import Banner from '@/sections/home/Banner'
import {Suspense} from 'react'
import ListMovieType from '@/sections/home/ListMovieType'

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
    const [t, resGenreId, resBanner] = await Promise.all([
      getDictionary(params.lang),
      movieApiRequest.SgenreID('genres2', accessToken, params.lang),
      movieApiRequest.Sbanner(accessToken),
    ])

    // Kiểm tra status trả về để xác định lỗi
    if (resGenreId.status !== 200 || resBanner.status !== 200) {
      console.error('API Error:', {
        genreError: resGenreId.status,
        bannerError: resBanner.status,
      })
      return redirect('/login') // Redirect về login nếu lỗi xác thực
    }

    // Lấy dữ liệu payload
    const dataBanner = resBanner?.payload?.data || []
    const dataGenre = resGenreId?.payload?.data || []

    return (
      <Suspense fallback={<div>..loading</div>}>
        {/* Component Banner */}
        <Banner
          dataBanner={dataBanner}
          t={t}
          lang={params.lang}
        />
        {/* Component ListMovieType */}
        <ListMovieType
          t={t}
          lang={params.lang}
          idGenre='home'
          dataGenre={dataGenre}
        />
      </Suspense>
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
