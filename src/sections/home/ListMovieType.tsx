/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingCard from '@/components/Loading/LoadingCard'
import PlayListMovie from '@/components/PlayListMovie/PlayListMovie'
import React from 'react'
import {Suspense} from 'react'
interface ListMovieTypeProp {
  idGenre: any
  dataGenre: any
  t: any
  lang: string
}

export default function ListMovieType({
  idGenre,
  dataGenre: dataHome,
  t,
  lang,
}: ListMovieTypeProp) {
  return (
    <div>
      <div className='overflow-hidden pt-[5rem] xsm:pt-4 h-full '>
        {dataHome?.dataGenre?.map((playList: any, index: number) => {
          return (
            <section key={index}>
              <Suspense fallback={<LoadingCard />}>
                <PlayListMovie
                  t={t}
                  lang={lang}
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
