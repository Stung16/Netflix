/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import PlayListMovie from '@/components/PlayListMovie/PlayListMovie'
import React, {Fragment} from 'react'

export default function ListMovieType({idGenre, dataGenre: dataHome}: any) {
  return (
    <div>
      <div className=' min-h-screen overflow-hidden pt-[5rem]'>
        {dataHome?.dataGenre?.map((playList: any, index: number) => {
          return (
            <Fragment key={index}>
              <PlayListMovie
                dataPlaylist={playList}
                favoriteMovies={dataHome?.idMovieFavorite}
                idGenre={idGenre}
              />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
