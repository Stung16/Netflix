/* eslint-disable @typescript-eslint/no-explicit-any */
import acountApiRequest from '@/apiRequest/account'
import movieApiRequest from '@/apiRequest/movie'
import Watch from '@/sections/wath/Watch'
import {cookies} from 'next/headers'
import React from 'react'
import {redirect} from 'next/navigation'
import getDictionary from '@/app/dictionaries'
export default async function WatchPage({
  params,
  searchParams,
}: {
  params: {
    lang: string
    id: string | number
  }
  searchParams: {
    trackId: string | number
  }
}) {
  const cookieStore = cookies()
  const accesstoken = cookieStore.get('accessToken')?.value
  try {
    const [resMovie, resAccount, t] = await Promise.all([
      movieApiRequest.Smovie(
        accesstoken,
        `${params.id}?trackId=${searchParams.trackId}`,
      ),
      acountApiRequest.Sme(accesstoken),
      getDictionary(params.lang),
    ])
    const dataAcount = resAccount.payload?.data
    const dataMovie = resMovie.payload?.data
    if (!dataAcount?.subscriptions_id) {
      return redirect('/signup/planform')
    }
    return (
      <Watch
        t={t}
        movieId={params.id}
        trackId={searchParams.trackId}
        dataMovie={dataMovie}
      />
    )
  } catch (error: any) {
    console.log(error)
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }
}
