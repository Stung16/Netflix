/* eslint-disable @typescript-eslint/no-explicit-any */
// todo
import {Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog'
import {Cross2Icon} from '@radix-ui/react-icons'
import {Fragment, useEffect, useState} from 'react'
import {Skeleton} from '@/components/ui/skeleton'
import {getYear} from '@/lib/utils'
import IcPlay from '@/components/icons/IcPlay'
import ListEpisode from '@/components/movie/ListEpisode/ListEpisode'
import Link from 'next/link'
import Image from 'next/image'

export default function PopUpInfoMovie({
  open,
  setOpen,
  dataBanner,
}: {
  open: boolean
  setOpen: (state: boolean) => void
  dataBanner: any
}) {
  const trackId =
    dataBanner?.seasons
      .find((item: any) => item.season_number === '1')
      ?.episodes.find((episode: any) => episode.episode_number === 1)?.id ||
    '123'

  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false)
  const handleVideoEnd = () => {
    setIsVideoEnded(true)
  }
  useEffect(() => {
    setIsVideoEnded(false)
  }, [open])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className='font-netflix outline-none ring-0 max-w-[70rem] sm:w-[55rem] bg-[#181818] p-0 m-0 border-none text-white overflow-y-scroll max-h-[40rem] scrollCustom'>
        {/* videoTrailer */}
        {!dataBanner ? (
          <Skeleton className='w-full h-[30rem] bg-[#666]' />
        ) : (
          <div className='w-full h-[30rem] bg-[linear-gradient(0deg,#181818,transparent_50%)] relative'>
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
                <Image
                  width={1000}
                  height={500}
                  src={dataBanner?.image_url}
                  alt=''
                  className='size-full object-cover absolute z-10'
                />
                <video
                  src={dataBanner?.trailer}
                  autoPlay
                  muted
                  onEnded={handleVideoEnd}
                  poster={dataBanner?.image_url}
                  playsInline
                  webkit-playsinline={true.toString()}
                  className='object-cover size-full absolute z-20'
                />
              </Fragment>
            )}
            {/* control&infoIntro */}
            <Link
              href={`/watch/${dataBanner?.id}?trackId=${trackId}`}
              className='absolute bottom-12 z-30 left-12 flex items-center bg-white text-black pl-4 pr-[1.4rem] py-[0.4rem] rounded-sm cursor-pointer'
            >
              <IcPlay className='size-[1.8rem] mr-4' />
              <span className='font-medium leading-8 text-[1.2rem]'>Phát</span>
            </Link>
            <div className='bg-[linear-gradient(0deg,#181818,transparent_50%)] absolute top-0 w-full h-[101%]' />
          </div>
        )}

        {/* infor */}
        <div className='px-12'>
          {/* introduce */}
          <div
            className='grid gap-x-8'
            style={{gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)'}}
          >
            <div className='flex flex-col'>
              <div className='flex text-[#bcbcbc] flex-wrap space-x-2 items-center font-normal text-lg'>
                <DialogTitle>{getYear(dataBanner?.created_at)}</DialogTitle>

                {/* <span className='leading-[1.2]'></span> */}
                <span className='leading-[1.2]'>
                  {dataBanner?.type !== 'single' ? (
                    `${dataBanner?.seasons?.length} mùa`
                  ) : (
                    <div className='break-words m-2 ml-0'>
                      {dataBanner?.contentWarnings?.map((item: any) => {
                        return <span key={item?.id}>{item?.content}, </span>
                      })}
                    </div>
                  )}
                </span>
                <span className='flex leading-[1.2] justify-center items-end border border-solid border-[hsla(0,0%,100%,.4)] text-[0.7rem] h-fit px-1 rounded-sm'>
                  HD
                </span>
              </div>
              <span className='uppercase mt-[0.1rem] line-clamp-2  border border-solid border-[hsla(0,0%,100%,.4)] px-[0.5rem] w-fit bg-transparent text-sm leading-[1.5]'>
                {dataBanner?.age_rating}
              </span>
              {/* desc commintsoon */}
              {/* <span className='inline-block mt-[0.8rem] font-medium text-xl'>Tập mới ra mắt vào Thứ Tư</span> */}
              <p className='leading-[1.5rem] mt-[0.875rem]'>
                {dataBanner?.desc}
              </p>
            </div>
            <div className='flex flex-col text-[0.875rem] leading-[1.25rem]'>
              <div className='break-words m-2 ml-0'>
                <span className='text-[#777]'>Diễn viên:</span>
                {dataBanner?.actors?.map((item: any) => {
                  return <span key={item?.id}>{item?.name}, </span>
                })}
              </div>
              <div className='break-words m-2 ml-0'>
                <span className='text-[#777]'>Thể loại:</span>
                {dataBanner?.genres?.map((item: any) => {
                  return <span key={item?.id}>{item?.name}, </span>
                })}
              </div>
              <div className='break-words m-2 ml-0'>
                <span className='text-[#777]'>Bộ phim này:</span>
                {dataBanner?.tags?.map((item: any) => {
                  return <span key={item?.id}>{item?.name}, </span>
                })}
              </div>
            </div>
          </div>
          <ListEpisode dataMovie={dataBanner} />
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
