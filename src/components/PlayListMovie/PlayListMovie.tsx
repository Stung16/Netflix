/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Slider from 'react-slick'
import style from './style.module.css'
import IcNextSlide from '@/components/icons/IcNextSlide'
import {cn, redirectLinkWithLang} from '@/lib/utils'
import {Fragment, useRef, useState} from 'react'
import {Skeleton} from '@/components/ui/skeleton'
import Link from 'next/link'
import CardMovie from '@/components/movie/card/CardMovie'
// import LoadingCard from '@/components/Loading/LoadingCard'
interface SliderSettings {
  infinite: boolean
  speed: number
  slidesToShow: number
  slidesToScroll: number
  draggable?: boolean
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void
  initialSlide?: number
  responsive?: any
}
interface PlayListMovieProps {
  dataPlaylist: any
  favoriteMovies: any
  idGenre: any
  lang: string
  t: any
}

export default function PlayListMovie({
  dataPlaylist,
  favoriteMovies,
  idGenre,
  lang,
  t,
}: PlayListMovieProps) {
  const isLoading = false
  const sliderRef = useRef<Slider | null>(null)
  const [loop, setLoop] = useState<boolean>(false)
  const settings: SliderSettings = {
    infinite: loop,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    draggable: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
    ],
  }
  const goToNextSlide = () => {
    if (sliderRef.current) {
      if (!loop) {
        setLoop(true)
      }
      sliderRef.current.slickNext()
    }
  }

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }
  return (
    <div className='bg-transparent pb-12'>
      <h2 className={`font-medium leading-[1.3] ${style.titleSub}`}>
        <div className='flex items-end mb-2'>
          {!isLoading ? (
            <Link
              href={redirectLinkWithLang(lang)}
              className={`${style.titlePlayList} text-[#e5e5e5] hover:text-white ml-[3.75rem] xsm:ml-4 mr-4 text-2xl xsm:text-base w-fit block`}
            >
              {dataPlaylist?.title}
            </Link>
          ) : (
            <Skeleton className='w-[20vw] xsm:h-4 h-6 bg-[#666] ml-[3.75rem] xsm:ml-4' />
          )}
          <div
            className={`xsm:hidden flex items-center ${style.groupBtnSeeAll}`}
          >
            <p
              className={`${style.btnSeeAll} origin-left font-medium text-base whitespace-nowrap text-[#54b9c5] cursor-pointer mr-1`}
            >
              Xem tất cả
            </p>
            <IcNextSlide
              className={`${style.iconNext} text-[#54b9c5] size-5 invisible`}
            />
          </div>
        </div>
      </h2>
      <div
        className={`slider-container hover:z-50 no-scrollbar ${style.listMovieSlide} relative`}
      >
        <Slider
          ref={sliderRef}
          {...settings}
          className='px-10 overflow-visible xsm:px-4'
        >
          {dataPlaylist?.movies?.map((movie: any) => {
            return (
              <Fragment key={movie?.id}>
                <CardMovie
                  t={t}
                  lang={lang}
                  inforMovie={movie}
                  idGenre={`genreID/${idGenre}`}
                  favoriteMovies={favoriteMovies}
                />
              </Fragment>
            )
          })}
        </Slider>
        {/* prev */}
        {loop ? (
          <div
            className='group absolute bg-[hsla(0,0%,8%,0.7)] left-0 w-10 xsm:w-6 top-0 bottom-0 flex justify-center items-center cursor-pointer'
            onClick={goToPrevSlide}
          >
            <IcNextSlide
              className={cn(
                'transition-["scale"] group-hover:scale-125 text-white size-8 rotate-180 ',
              )}
            />
          </div>
        ) : (
          <div className='group absolute bg-transparent left-0 w-10 top-0 bottom-0 flex justify-center items-center cursor-pointer pointer-events-none' />
        )}

        {/* next */}
        <div
          className='group absolute bg-[hsla(0,0%,8%,0.7)] right-0 w-10 xsm:w-6 top-0 bottom-0 flex justify-center items-center cursor-pointer'
          onClick={goToNextSlide}
        >
          <IcNextSlide
            className={cn(
              'transition-["scale"] group-hover:scale-125 text-white size-8 ',
            )}
          />
        </div>
      </div>
    </div>
  )
}
