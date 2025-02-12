'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
// todo
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {Cross2Icon} from '@radix-ui/react-icons'
import {Fragment, useEffect, useState, useRef, memo} from 'react'
import {Skeleton} from '@/components/ui/skeleton'
import {getYear, redirectLinkWithLang} from '@/lib/utils'
import IcPlay from '@/components/icons/IcPlay'
import ListEpisode from '@/components/movie/ListEpisode/ListEpisode'
import Link from 'next/link'
import Image from 'next/image'
import Control_type from '@/components/banner/Control_type'
import controlStore from '@/app/(store)/control'

const PopUpInfoMovie = ({
  open,
  setOpen,
  dataBanner,
  t,
  lang,
}: {
  open: boolean
  setOpen: (state: boolean) => void
  dataBanner: any
  t: any
  lang: string
}) => {
  const {videoBanner} = controlStore()
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true) // Mặc định tắt tiếng
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const trackId = dataBanner?.seasons
    .find((item: any) => item.season_number === '1')
    ?.episodes.find((episode: any) => episode.episode_number === 1)?.id

  // Lưu vị trí phát video
  const saveVideoPosition = () => {
    if (videoRef.current) {
      localStorage.setItem(
        'videoPosition',
        videoRef.current.currentTime.toString(),
      )
    }
  }
  const handleVideoEnd = () => {
    setIsVideoEnded(true)
  }
  useEffect(() => {
    const video = videoRef.current
    // Khôi phục vị trí video
    if (video) {
      const savedPosition = localStorage.getItem('videoPosition')
      if (savedPosition) {
        video.currentTime = parseFloat(savedPosition)
      }
      video.muted = true // Đảm bảo tắt tiếng mặc định
      video.play().catch(() => {
        console.warn('User interaction required to autoplay video.')
      })
    }

    // Dừng video khi tab không hiển thị
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video?.pause()
        saveVideoPosition() // Lưu vị trí khi tab bị ẩn
      } else {
        video?.play().catch(() => {
          console.warn('User interaction required to autoplay video.')
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup khi component bị unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      saveVideoPosition()
      localStorage.removeItem('videoPosition')
      video?.pause()
    }
  }, [])
  // useEffect(() => {
  //   if (videoBanner) {
  //     if (open) {
  //       videoBanner?.pause()
  //     } else {
  //       videoBanner?.play()
  //     }
  //     console.log(videoBanner?.paused)
  //   }
  // }, [open, videoBanner])

  return (
    <Dialog
      open={open}
      onOpenChange={(e: boolean) => {
        if (!e) {
          videoBanner?.play()
        }
        setOpen(e)
      }}
    >
      <DialogContent className='font-netflix outline-none ring-0 max-w-[70rem] sm:w-[55rem] bg-[#181818] p-0 m-0 border-none text-white overflow-y-scroll max-h-[40rem] scrollCustom xsm:max-h-[35rem]'>
        <DialogDescription></DialogDescription>
        {/* videoTrailer */}
        {!dataBanner ? (
          <Skeleton className='w-full h-[30rem] bg-[#666]' />
        ) : (
          <div className='w-full h-[30rem] xsm:h-[15rem] bg-[linear-gradient(0deg,#181818,transparent_50%)] relative'>
            {isVideoEnded ? (
              <Image
                width={1000}
                height={500}
                src={dataBanner?.image_url}
                alt=''
                className='size-full object-cover'
              />
            ) : (
              <Fragment>
                <video
                  ref={videoRef}
                  src={dataBanner?.trailer}
                  autoPlay
                  muted={true} // Luôn tắt tiếng khi phát tự động
                  onCanPlay={() => {
                    videoRef.current?.play().catch(() => {
                      console.warn(
                        'User interaction required to autoplay video.',
                      )
                    })
                  }}
                  onEnded={handleVideoEnd}
                  poster={dataBanner?.image_url}
                  playsInline
                  webkit-playsinline={true.toString()}
                  className='object-cover size-full'
                />
                <Control_type
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  videoRef={videoRef}
                  age_rating={dataBanner?.age_rating}
                  cls='top-[25rem] xsm:top-[10rem]'
                />
              </Fragment>
            )}
            {/* control&infoIntro */}
            <Link
              href={redirectLinkWithLang(
                lang,
                `watch/${dataBanner?.id}?trackId=${trackId}`,
              )}
              className='absolute bottom-12 z-30 left-12 flex items-center bg-white text-black pl-4 pr-[1.4rem] py-[0.4rem] xsm:py-0 xsm:px-4 rounded-sm cursor-pointer'
            >
              <IcPlay className='size-[1.8rem] mr-4 xsm:size-4' />
              <span className='font-medium leading-8 text-[1.2rem] xsm:text-[0.8rem]'>
                {t.button.play}
              </span>
            </Link>
            <div className='bg-[linear-gradient(0deg,#181818,transparent_50%)] absolute top-0 w-full h-[101%]' />
          </div>
        )}

        {/* infor */}
        <div className='px-12 xsm:px-4'>
          {/* introduce */}
          <div
            className='grid gap-x-8 xsm:gap-x-6'
            style={{gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)'}}
          >
            <div className='flex flex-col xsm:text-[0.6rem]'>
              <div className='flex xsm:flex-col text-[#bcbcbc] flex-wrap sm:space-x-2 sm:items-center font-normal text-lg xsm:text-sm'>
                <DialogTitle>{getYear(dataBanner?.created_at)}</DialogTitle>

                {/* <span className='leading-[1.2]'></span> */}
                <span className='leading-[1.2] text-sm'>
                  {dataBanner?.type !== 'single' ? (
                    `- ${+dataBanner?.seasons?.length - 1} ${t.movie.seasons}`
                  ) : (
                    <div className='break-words m-2 ml-0 text-sm xsm:text-[0.7rem]'>
                      {dataBanner?.contentWarnings?.map((item: any) => {
                        return <span key={item?.id}>{item?.content}, </span>
                      })}
                    </div>
                  )}
                </span>
                <span className='flex xsm:w-fit leading-[1.2] justify-center items-end border border-solid border-[hsla(0,0%,100%,.4)] text-[0.7rem] xsm:text-[0.5rem] h-fit px-1 rounded-sm'>
                  HD
                </span>
              </div>
              <span className='uppercase mt-[0.1rem] xsm:mt-2 line-clamp-2  border border-solid border-[hsla(0,0%,100%,.4)] px-[0.5rem] w-fit bg-transparent text-sm leading-[1.5]'>
                {dataBanner?.age_rating}
              </span>
              {/* desc commintsoon */}
              {/* <span className='inline-block mt-[0.8rem] font-medium text-xl'>Tập mới ra mắt vào Thứ Tư</span> */}
              <p className='leading-[1.5rem] xsm:leading-4 mt-[0.875rem]'>
                {dataBanner?.desc}
              </p>
            </div>
            <div className='flex flex-col text-[0.875rem] leading-[1.25rem] xsm:text-[0.6rem]'>
              <div className='break-words sm:m-2 ml-0'>
                <span className='text-[#777] xsm:text-[0.7rem]'>
                  {`${t.movie.cast}: `}
                </span>
                {dataBanner?.actors?.map((item: any) => {
                  return <span key={item?.id}>{item?.name}, </span>
                })}
              </div>
              <div className='break-words sm:m-2 ml-0'>
                <span className='text-[#777] xsm:text-[0.7rem]'>
                  {`${t.movie.genres}: `}
                </span>
                {dataBanner?.genres?.map((item: any) => {
                  return <span key={item?.id}>{item?.name}, </span>
                })}
              </div>
              <div className='break-words sm:m-2 ml-0'>
                <span className='text-[#777] xsm:text-[0.7rem]'>
                  {`${t.movie.thisMovieIs}: `}
                </span>
                {dataBanner?.tags?.map((item: any) => {
                  return <span key={item?.id}>{item?.name}, </span>
                })}
              </div>
            </div>
          </div>
          <ListEpisode
            dataMovie={dataBanner}
            t={t}
            lang={lang}
          />
          {/* introduce footer*/}
        </div>
        {/* closeBtn */}
        <div
          onClick={() => setOpen(false)}
          className='bg-[#181818] p-2 cursor-pointer absolute right-4 top-4 rounded-full opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none'
        >
          <Cross2Icon className='size-6 text-white' />
        </div>
        {/*  */}
      </DialogContent>
    </Dialog>
  )
}
export default memo(PopUpInfoMovie)
