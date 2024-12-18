/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingCard from '@/components/Loading/LoadingCard'
import PlayListMovie from '@/components/PlayListMovie/PlayListMovie'
import React, {Fragment} from 'react'
import {Suspense} from 'react'

export default function ListMovieType({idGenre, dataGenre: dataHome}: any) {
  return (
    <div>
      <div className=' min-h-screen overflow-hidden pt-[5rem]'>
        {dataHome?.dataGenre?.map((playList: any, index: number) => {
          return (
            <Fragment key={index}>
              <Suspense fallback={<LoadingCard />}>
                <PlayListMovie
                  dataPlaylist={playList}
                  favoriteMovies={dataHome?.idMovieFavorite}
                  idGenre={idGenre}
                />
              </Suspense>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
