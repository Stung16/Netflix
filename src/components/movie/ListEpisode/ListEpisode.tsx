/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import IcPlay from '@/components/icons/IcPlay'
import {cn, redirectLinkWithLang} from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
interface ListEpisodeProps {
  dataMovie: any
  t: any
  lang: string
}
export default function ListEpisode({dataMovie, t, lang}: ListEpisodeProps) {
  const [seasion, setSeasion] = useState('1')

  return (
    <div>
      {/* header */}
      <div className='flex items-center justify-between xsm:mt-2'>
        <h3 className='text-2xl xsm:text-lg'>{t.movie.episodes}</h3>
        {(dataMovie?.type as any) !== 'single' && (
          <Select
            defaultValue={seasion}
            onValueChange={(value) => {
              setSeasion(value)
            }}
          >
            <SelectTrigger className='border-white w-[180px] border-solid'>
              <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dataMovie?.seasons?.map((item: any) => {
                  return (
                    <SelectItem
                      value={`${item?.season_number}`}
                      key={item?.id}
                    >{`${t.movie.seasons} ${item?.season_number}`}</SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      {(dataMovie?.type as any) !== 'single' && (
        <>
          <p className='xsm:mt-2'>
            {t.movie.seasons} {seasion}:{' '}
            <span className='border p-[0.1rem] text-sm mr-1'>
              {dataMovie?.age_rating}
            </span>
            {dataMovie?.contentWarnings
              ?.map((item: any) => item?.content)
              .join(', ')}
          </p>
        </>
      )}

      <div className='flex flex-col pb-16 mt-2'>
        {dataMovie?.seasons?.[+seasion - 1]?.episodes?.map(
          (item: any, index: number) => {
            return (
              <Link
                href={redirectLinkWithLang(
                  lang,
                  `watch/${dataMovie?.id}?trackId=${item.id}`,
                )}
                key={item?.id}
                className={`cursor-pointer flex items-center group min-h-[9rem] xsm:min-h-[5rem] border-b border-solid border-[#404040] overflow-hidden p-4 xsm:p-2 rounded-lg ${index + 1 === 1 && 'bg-[#333]'}`}
              >
                <span className='text-[#d2d2d2] text-2xl px-6 xsm:text-lg xsm:px-2'>
                  {item.episode_number}
                </span>
                <div className='flex items-start space-x-4 pr-6 xsm:pr-2 xsm:space-x-2'>
                  <div className='relative'>
                    <Image
                      alt=''
                      src={item?.image_url}
                      className='object-cover sm:w-[15rem] h-[5rem] rounded-sm  xsm:h-[4rem]'
                      width={800}
                      height={500}
                    />
                    <div
                      className={cn(
                        'xsm:hidden absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 border rounded-full p-2 opacity-0 transition-all',
                        'group-hover:opacity-100',
                      )}
                    >
                      <IcPlay className='size-6' />
                    </div>
                  </div>
                  <div className='flex flex-col xsm:text-[0.6rem]'>
                    <div className='flex items-center justify-between font-semibold xsm:text-xs'>
                      <span>
                        {t.movie.episodes} {item?.episode_number}
                      </span>
                    </div>
                    <p className='text-sm line-clamp-3 xsm:text-[0.5rem] xsm:leading-3'>
                      {item?.desc}
                    </p>
                  </div>
                </div>
              </Link>
            )
          },
        )}
      </div>
    </div>
  )
}
