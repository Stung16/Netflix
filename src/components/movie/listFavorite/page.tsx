/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import CardMovieFavorite from '@/components/movie/card/CardMovieFavorite'
import React, {Fragment} from 'react'

export default function ListFavorite({dataFavorites}: any) {
  return (
    <div className='grid grid-cols-5 items-center gap-x-4 gap-y-[5rem]'>
      {dataFavorites?.map((movieFavorite: any) => {
        return (
          <Fragment key={movieFavorite?.id}>
            <CardMovieFavorite inforMovie={movieFavorite} />
          </Fragment>
        )
      })}
    </div>
  )
}
