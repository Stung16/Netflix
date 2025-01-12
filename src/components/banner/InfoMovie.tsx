/* eslint-disable @typescript-eslint/no-explicit-any */
// import controlStore from '@/app/(store)/control'
import IcInfor from '@/components/icons/IcInfor'
import IcPlay from '@/components/icons/IcPlay'
import PopUpInfoMovie from '@/components/popUps/PopUpInfoMovie'
import Link from 'next/link'
import {useState} from 'react'

export default function InfoMovie({dataBanner, t}: any) {
  // const {isPlayBanner, setIsPlayBanner} = controlStore()

  const trackId = dataBanner?.seasons
    .find((item: any) => item.season_number === '1')
    ?.episodes.find((episode: any) => episode.episode_number === 1)?.id

  const [open, setOpent] = useState<boolean>(false)
  // useEffect(() => {
  //   if (open) {
  //     setIsPlayBanner(false)
  //   }
  // }, [open])
  return (
    <div className='absolute bottom-[35%] left-[3.75rem] w-[36.188rem] xsm:bottom-[10%] xsm:left-[1rem] xsm:w-[21.5rem] z-10'>
      {/* <img className='h-[15.2rem] w-full mb-[1.2rem]' src='/images/banner/titleMovie.webp' alt='' /> */}
      <h1 className='font-sackers text-white text-8xl xsm:text-2xl'>
        {dataBanner?.title}
      </h1>
      <p className='font-normal text-[1.2rem] text-white sm:leading-6 text-justify xsm:text-[0.6rem]'>
        {dataBanner?.desc}
      </p>
      {/* billboard */}
      <div className='mt-6 flex mb-4 xsm:mb-0'>
        <Link
          href={`/watch/${dataBanner?.id}?trackId=${trackId}`}
          className='mr-4 flex items-center bg-white text-black pl-4 pr-[1.4rem] py-[0.6rem] rounded-sm cursor-pointer xsm:px-2 xsm:py-0'
        >
          <IcPlay className='size-[1.8rem] mr-4 xsm:size-4 xsm:mr-2' />
          <span className='font-medium leading-6 text-[1.2rem] xsm:text-[0.6rem]'>
            {t.button.play}
          </span>
        </Link>
        <div
          className='flex items-center bg-[rgba(109,109,110,0.7)] text-white pl-4 pr-[1.4rem] py-[0.6rem] rounded-sm cursor-pointer xsm:pr-4 xsm:py-[0.2rem] xsm:pl-2'
          onClick={() => setOpent(true)}
        >
          <IcInfor className='size-[1.8rem] mr-4 xsm:size-4 xsm:mr-2' />
          <span className='font-medium leading-6 text-[1.2rem] xsm:text-[0.6rem]'>
            {t.button.inforOther}
          </span>
        </div>
      </div>
      <PopUpInfoMovie
        t={t}
        open={open}
        setOpen={setOpent}
        dataBanner={dataBanner}
      />
    </div>
  )
}
