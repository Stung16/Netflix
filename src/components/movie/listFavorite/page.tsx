/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import CardMovieFavorite from '@/components/movie/card/CardMovieFavorite'
import React, {Fragment} from 'react'

export default function ListFavorite({dataFavorites, t}: any) {
  return (
    <div className='grid grid-cols-5 xsm:grid-cols-2 items-center gap-x-4 xsm:gap-y-4 gap-y-[5rem]'>
      {dataFavorites?.map((movieFavorite: any) => {
        return (
          <Fragment key={movieFavorite?.id}>
            <CardMovieFavorite
              inforMovie={movieFavorite}
              t={t}
            />
          </Fragment>
        )
      })}
    </div>
  )
}
