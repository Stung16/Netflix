'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {memo, useEffect, useState} from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import IcListEipoints from '@/components/icons/IcListEipoints'
import {cn} from '@/lib/utils'
import {useSearchParams} from 'next/navigation'

function PopupListEpsiode({t, listEpsiode}: any) {
  const [activeEpisode, setActiveEpisode] = useState<null | string>(null)
  const searchParams = useSearchParams()
  const trackId = searchParams.get('trackId')

  const handleEpisodeClick = (id: string) => {
    if (activeEpisode !== id) {
      setActiveEpisode(id) // Chỉ cập nhật khi ID khác
    }
  }
  useEffect(() => {
    if (trackId) {
      setActiveEpisode(trackId)
    }
  }, [trackId, setActiveEpisode])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IcListEipoints className='size-8 cursor-pointer text-white group-hover:scale-125' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-[#606060] w-[35rem] max-h-[37rem] overflow-y-scroll'>
        {listEpsiode?.length > 1 ? (
          <>
            <DropdownMenuLabel> {t.title.TvShortShow}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {listEpsiode.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <DropdownMenuLabel className='text-xl text-white'>
                    phần {item?.season_number}
                  </DropdownMenuLabel>
                  {item?.episodes.map((episode: any) => (
                    <DropdownMenuItem
                      key={episode.id}
                      className={`flex flex-col text-lg group py-4 px-4 cursor-pointer ${
                        activeEpisode === episode.id
                          ? 'bg-[#141414] text-white hover:text-black'
                          : 'hover:bg-[#aaaa]'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleEpisodeClick(episode.id)
                      }}
                    >
                      <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center space-x-3'>
                          <span>{episode.id}</span>
                          <p>{episode.title}</p>
                        </div>
                        <span
                          className={cn(
                            'h-[0.1rem] w-[8rem] bg-white',
                            ' group-hover:bg-black',
                          )}
                        ></span>
                      </div>
                      {activeEpisode === episode.id && (
                        <div className='flex items-start justify-between space-x-6 px-2 pb-4'>
                          <Image
                            alt={episode.title}
                            className='h-[6rem] w-auto object-cover'
                            width={1000}
                            height={500}
                            src={episode.imageUrl}
                          />
                          <p className='text-base line-clamp-4 text-justify'>
                            {episode.description}
                          </p>
                        </div>
                      )}
                    </DropdownMenuItem>
                  ))}
                </React.Fragment>
              )
            })}
          </>
        ) : (
          <>
            <DropdownMenuLabel> {t.title.TvShortShow}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {listEpsiode?.[0]?.episodes.map((episode: any) => (
              <DropdownMenuItem
                key={episode.id}
                className={`flex flex-col text-lg group py-4 px-4 cursor-pointer ${
                  activeEpisode === episode.id
                    ? 'bg-[#141414] text-white hover:text-black'
                    : 'hover:bg-[#aaaa]'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleEpisodeClick(episode.id)
                }}
              >
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center space-x-3'>
                    <span>{episode?.episode_number}</span>
                    <p>{episode?.id}</p>
                  </div>
                  <span
                    className={cn(
                      'h-[0.1rem] w-[8rem] bg-white',
                      ' group-hover:bg-black',
                    )}
                  ></span>
                </div>
                {activeEpisode === episode.id && (
                  <div className='flex items-start justify-between space-x-6 px-2 pb-4'>
                    <Image
                      alt={episode?.id}
                      className='h-[6rem] w-auto object-cover'
                      width={1000}
                      height={500}
                      src={episode.image_url}
                    />
                    <p className='text-base line-clamp-4 text-justify'>
                      {episode?.desc}
                    </p>
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default memo(PopupListEpsiode)
