/* eslint-disable @typescript-eslint/no-explicit-any */
import IcInfor from '@/components/icons/IcInfor'
import IcPlay from '@/components/icons/IcPlay'
import PopUpInfoMovie from '@/components/popUps/PopUpInfoMovie'
import Link from 'next/link'
import {useState} from 'react'

export default function InfoMovie({dataBanner}: any) {
  const trackId = dataBanner?.seasons
    .find((item: any) => item.season_number === '1')
    ?.episodes.find((episode: any) => episode.episode_number === 1)?.id

  const [open, setOpent] = useState<boolean>(false)
  return (
    <div className='absolute bottom-[35%] left-[3.75rem] w-[36.188rem]'>
      {/* <img className='h-[15.2rem] w-full mb-[1.2rem]' src='/images/banner/titleMovie.webp' alt='' /> */}
      <h1 className='font-beautique text-white text-8xl'>
        {dataBanner?.title}
      </h1>
      <p className='font-normal text-[1.2rem] text-white leading-6 text-justify'>
        {dataBanner?.desc}
      </p>
      {/* billboard */}
      <div className='mt-6 flex mb-4'>
        <Link
          href={`/watch/${dataBanner?.id}?trackId=${trackId}`}
          className='mr-4 flex items-center bg-white text-black pl-4 pr-[1.4rem] py-[0.6rem] rounded-sm cursor-pointer'
        >
          <IcPlay className='size-[1.8rem] mr-4' />
          <span className='font-medium leading-8 text-[1.2rem]'>Phát</span>
        </Link>
        <div
          className='flex items-center bg-[rgba(109,109,110,0.7)] text-white pl-4 pr-[1.4rem] py-[0.6rem] rounded-sm cursor-pointer'
          onClick={() => setOpent(true)}
        >
          <IcInfor className='size-[1.8rem] mr-4' />
          <span className='font-medium leading-8 text-[1.2rem]'>
            Thông tin khác
          </span>
        </div>
      </div>
      <PopUpInfoMovie
        open={open}
        setOpen={setOpent}
        dataBanner={dataBanner}
      />
    </div>
  )
}
