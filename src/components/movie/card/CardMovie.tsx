/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import RevalidateTags from '@/actions/revalidateTags'
import movieApiRequest from '@/apiRequest/movie'
import IcFavorite from '@/components/icons/IcFavorite'
import IcLike from '@/components/icons/IcLike'
import IcNextSlide from '@/components/icons/IcNextSlide'
import IcPlay from '@/components/icons/IcPlay'
import IcPlus from '@/components/icons/IcPlus'
import PopUpInfoMovie from '@/components/popUps/PopUpInfoMovie'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import controlStore from '@/app/(store)/control'
import {Fragment, useEffect, useRef, useState, useTransition} from 'react'
import Control_type from '@/components/banner/Control_type'

export default function CardMovie({
  inforMovie,
  favoriteMovies,
  idGenre,
  t,
}: any) {
  console.log(inforMovie)

  const {videoBanner} = controlStore()
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPending, setTransition] = useTransition()
  const trackId = inforMovie?.seasons
    .find((item: any) => item.season_number === '1')
    ?.episodes.find((episode: any) => episode.episode_number === 1)?.id
  const [open, setOpent] = useState<boolean>(false)
  const myRef = useRef(null)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)
  const [active, setActive] = useState<boolean>(false)
  useEffect(() => {
    if (myRef.current) {
      // @ts-ignore
      const pEl = myRef.current?.parentElement?.parentElement?.parentElement
      const listActives = pEl.querySelectorAll(`.slick-active .slideItem_slick`)
      if (listActives.length > 0) {
        // Lấy phần tử đầu tiên và thêm class
        listActives[0].classList.add('origin-left') // Thêm class vào phần tử đầu tiên

        // Lấy phần tử cuối cùng và thêm class
        listActives[listActives.length - 1].classList.add('origin-right') // Thêm class vào phần tử cuối cùng
      }
    }
  }, [myRef, active])
  const handleAddFavorite = (id: string | number) => {
    setTransition(async () => {
      const res = await movieApiRequest.addFavorite(id)
      if (res.status === 200) {
        RevalidateTags(idGenre)
      }
    })
  }
  const handleDeleteFavorite = (id: string | number) => {
    setTransition(async () => {
      const res = await movieApiRequest.deleteFavorite(id)
      if (res.status === 200) {
        RevalidateTags(idGenre)
      }
    })
  }
  return (
    <Fragment>
      <div
        ref={myRef}
        className='relative'
        onMouseEnter={() => {
          hoverTimeout.current = setTimeout(() => {
            setActive(true)
            videoBanner?.pause()
          }, 500)
        }}
        onMouseLeave={() => {
          if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current)
            hoverTimeout.current = null // Đặt lại ref về null để tránh rò rỉ bộ nhớ
          }
          setActive(false)
          if (videoBanner?.ended || open) return
          videoBanner?.play()
        }}
      >
        <Image
          className='h-[10.313rem] object-cover rounded-md'
          width={800}
          height={400}
          src={inforMovie?.thumbnail_url}
          alt='Image'
          onClick={() => setOpent(true)}
        />
        <div
          className={cn(
            `slideItem_slick absolute top-4 z-[60] transition-all w-full opacity-0 invisible`,
            active && 'scale-150 opacity-100 visible ',
          )}
        >
          <div className=' bg-[#181818] flex flex-col text-white rounded-md'>
            <div className='relative'>
              <Image
                className='h-[10.313rem] absolute z-40 object-cover rounded-md'
                src={inforMovie?.thumbnail_url}
                width={800}
                height={400}
                alt='image'
              />
              {active && (
                <Fragment>
                  <video
                    src={inforMovie?.trailer}
                    autoPlay
                    muted
                    onPlay={() => videoBanner?.pause()}
                    onPause={() => videoBanner?.pause()}
                    ref={videoRef}
                    poster={inforMovie?.image_url}
                    className='object-cover h-[10.313rem] relative z-50'
                    playsInline
                    webkit-playsinline={true.toString()}
                  />
                  <Control_type
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    videoRef={videoRef}
                    cls='top-[8rem] z-[10000000]'
                    clsIcon='size-3'
                  />
                </Fragment>
              )}
            </div>
            <div className='p-4  flex-col flex'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <Link
                    href={`/watch/${inforMovie?.id}?trackId=${trackId}`}
                    className='inline-block bg-white p-2 rounded-full'
                  >
                    <IcPlay className='text-black size-4' />
                  </Link>
                  {favoriteMovies?.includes(inforMovie?.id) ? (
                    <span
                      onClick={() => {
                        handleDeleteFavorite(inforMovie?.id)
                      }}
                      className={cn(
                        'bg-[rgba(42,42,42,.6)] border-[hsla(0,0%,100%,.5)] border-[0.1rem] rounded-full p-[0.5rem] flex items-center justify-center',
                        `hover:border-white border-[0.1rem] ${isPending && 'pointer-events-none'}`,
                      )}
                    >
                      {isPending ? (
                        <div
                          className={`border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid animate-spin`}
                        />
                      ) : (
                        <IcFavorite className='size-4' />
                      )}
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        handleAddFavorite(inforMovie?.id)
                      }}
                      className={cn(
                        'bg-[rgba(42,42,42,.6)] border-[hsla(0,0%,100%,.5)] border-[0.1rem] rounded-full p-[0.5rem] flex items-center justify-center',
                        `${isPending && 'pointer-events-none'}  hover:border-white border-[0.1rem]`,
                      )}
                    >
                      {isPending ? (
                        <div
                          className={`border-white size-[1rem] rounded-[50%] border-[2px] border-r-0 border-solid animate-spin`}
                        />
                      ) : (
                        <IcPlus className='size-4' />
                      )}
                    </span>
                  )}
                  <span
                    className={cn(
                      'bg-[rgba(42,42,42,.6)] border-[hsla(0,0%,100%,.5)] border-[0.1rem] rounded-full p-[0.5rem] flex items-center justify-center',
                      'hover:border-white border-[0.1rem]',
                    )}
                  >
                    <IcLike className='size-4' />
                  </span>
                </div>
                <span
                  className={cn(
                    'bg-[rgba(42,42,42,.6)] border-[hsla(0,0%,100%,.5)] border-[0.1rem] rounded-full p-[0.5rem] flex items-center justify-center',
                    'hover:border-white border-[0.1rem]',
                  )}
                  onClick={() => {
                    setOpent(true)
                    setActive(false)
                    videoBanner?.pause()
                  }}
                >
                  <IcNextSlide className='size-4 rotate-[90deg]' />
                </span>
              </div>
              <div className='flex items-center mt-1'>
                {inforMovie?.tags?.map((item: any, index: number) => {
                  return (
                    <span
                      key={index}
                      className='text-xs'
                    >
                      {item?.name}
                      {index + 1 !== inforMovie?.tags?.length && ', '}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUpInfoMovie
        t={t}
        open={open}
        setOpen={setOpent}
        dataBanner={inforMovie}
      />
    </Fragment>
  )
}
