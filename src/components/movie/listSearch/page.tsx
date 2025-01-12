/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import CardMovie from '@/components/movie/card/CardMovie'
import React, {Fragment} from 'react'

export default function ListSearch({dataPlaylist, favoriteMovies, t}: any) {
  return (
    <div className='grid grid-cols-5 items-center gap-x-4 gap-y-[5rem]'>
      {dataPlaylist?.map((movie: any) => {
        return (
          <Fragment key={movie?.id}>
            <CardMovie
              t={t}
              inforMovie={movie}
              idGenre={'search'}
              favoriteMovies={favoriteMovies}
            />
          </Fragment>
        )
      })}
    </div>
  )
}
