/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react'
import Image from 'next/image'

export default function PopupListEpsiode({t}: any) {
  const [activeEpisode, setActiveEpisode] = useState<null | number>(null)
  const episodes = [
    {
      id: 1,
      title: 'Sống trong làn sương',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores deserunt, nisi ipsa mollitia minus dolorem nemo corrupti veritatis. Laboriosam sapiente eaque vel fuga, quasi.',
      imageUrl:
        'https://res.cloudinary.com/dtht61558/image/upload/v1732041531/thumb14_dypf7m.jpg',
    },
    {
      id: 2,
      title: 'Sống trong làn sương',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores deserunt, nisi ipsa mollitia minus dolorem nemo corrupti veritatis. Laboriosam sapiente eaque vel fuga, quasi.',
      imageUrl:
        'https://res.cloudinary.com/dtht61558/image/upload/v1732041531/thumb14_dypf7m.jpg',
    },
    {
      id: 3,
      title: 'Sống trong làn sương',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores deserunt, nisi ipsa mollitia minus dolorem nemo corrupti veritatis. Laboriosam sapiente eaque vel fuga, quasi.',
      imageUrl:
        'https://res.cloudinary.com/dtht61558/image/upload/v1732041531/thumb14_dypf7m.jpg',
    },
    {
      id: 4,
      title: 'Sống trong làn sương',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores deserunt, nisi ipsa mollitia minus dolorem nemo corrupti veritatis. Laboriosam sapiente eaque vel fuga, quasi.',
      imageUrl:
        'https://res.cloudinary.com/dtht61558/image/upload/v1732041531/thumb14_dypf7m.jpg',
    },
    {
      id: 5,
      title: 'Sống trong làn sương',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores deserunt, nisi ipsa mollitia minus dolorem nemo corrupti veritatis. Laboriosam sapiente eaque vel fuga, quasi.',
      imageUrl:
        'https://res.cloudinary.com/dtht61558/image/upload/v1732041531/thumb14_dypf7m.jpg',
    },
    {
      id: 6,
      title: 'Sống trong làn sương',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores deserunt, nisi ipsa mollitia minus dolorem nemo corrupti veritatis. Laboriosam sapiente eaque vel fuga, quasi.',
      imageUrl:
        'https://res.cloudinary.com/dtht61558/image/upload/v1732041531/thumb14_dypf7m.jpg',
    },
    // Add more episodes here
  ]
  const handleEpisodeClick = (id: number) => {
    if (activeEpisode !== id) {
      setActiveEpisode(id) // Chỉ cập nhật khi ID khác
    }
  }
  return (
    <div className='text-white absolute top-full bg-[#606060] min-w-[35rem] right-0 flex flex-col'>
      <h3 className='px-2 tracking-[0.01rem] text-3xl leading-[3rem] font-medium py-2'>
        {t.title.TvShortShow}
      </h3>
      <ul className='flex flex-col max-h-[25rem] overflow-y-scroll'>
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={`flex flex-col text-lg py-4 px-4 cursor-pointer ${
              activeEpisode === episode.id ? 'bg-[#141414]' : 'hover:bg-[#aaaa]'
            }`}
            onClick={() => handleEpisodeClick(episode.id)}
          >
            <div className='flex items-center justify-between px-4'>
              <div className='flex items-center space-x-3'>
                <span>{episode.id}</span>
                <p>{episode.title}</p>
              </div>
              <span className='h-[0.1rem] w-[8rem] bg-white'></span>
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
          </li>
        ))}
      </ul>
    </div>
  )
}
