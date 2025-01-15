/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingCard from '@/components/Loading/LoadingCard'
import PlayListMovie from '@/components/PlayListMovie/PlayListMovie'
import React from 'react'
import {Suspense} from 'react'

export default function ListMovieType({idGenre, dataGenre: dataHome, t}: any) {
  return (
    <div>
      <div className='overflow-hidden pt-[5rem] xsm:pt-4 h-full '>
        {dataHome?.dataGenre?.map((playList: any, index: number) => {
          return (
            <section key={index}>
              <Suspense fallback={<LoadingCard />}>
                <PlayListMovie
                  t={t}
                  dataPlaylist={playList}
                  favoriteMovies={dataHome?.idMovieFavorite}
                  idGenre={idGenre}
                />
              </Suspense>
            </section>
          )
        })}
      </div>
    </div>
  )
}
