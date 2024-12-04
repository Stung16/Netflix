/* eslint-disable @typescript-eslint/no-explicit-any */
import movieApiRequest from '@/apiRequest/movie'
import Banner from '@/sections/home/Banner'
import ListMovieType from '@/sections/home/ListMovieType'
import {cookies} from 'next/headers'
import React, {Fragment} from 'react'

export default async function page() {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  const [resGenreId, resBanner] = await Promise.all([
    movieApiRequest.SgenreID('genres3', accesstoken),
    movieApiRequest.Sbanner(accesstoken),
  ])
  const dataBanner = resBanner.payload?.data
  const dataGenre = resGenreId.payload?.data

  return (
    <Fragment>
      <Banner dataBanner={dataBanner} />
      <ListMovieType
        idGenre={'genres3'}
        dataGenre={dataGenre}
      />
    </Fragment>
  )
}
