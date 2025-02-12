'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import IcBackHistory from '@/components/icons/IcBackHistory'
import dynamic from 'next/dynamic'
const PopupListEpsiode = dynamic(
  () => import('@/components/movie/ListEpisode/PopupListEpsiode'),
)
import {cn} from '@/lib/utils'
import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  options: any
  onReady: any
  inforEpisodes: any
  inforMovie: any
  t: any
}

export default function VideoPlayer({
  options,
  onReady,
  t,
  inforMovie,
}: VideoPlayerProps) {
  const router = useRouter()
  const [userActive, setUserActive] = useState<boolean>(true)
  const videoRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<typeof videojs.players | null>(null)

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add(
        'vjs-big-play-centered',
        'h-screen',
        'w-screen',
        'z-40',
      )
      videoRef.current.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('Player is ready')
        if (onReady) {
          onReady(player)
        }
      }))

      // Kiểm tra khi người dùng không tương tác (vjs-user-inactive)

      // Lắng nghe sự kiện
      player.on('userinactive', () => {
        setUserActive(false)
      })

      player.on('useractive', () => {
        setUserActive(true)
      })
    } else if (playerRef.current) {
      const player = playerRef.current
      player.autoplay(options.autoplay || false)
      player.src(options.sources || [])
    }
  }, [options, onReady])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [])
  const handleGoBack = () => {
    // Kiểm tra nếu không có lịch sử, quay về trang chủ
    if (document.referrer === '') {
      router.push('/') // Quay về trang chủ
    } else {
      router.back() // Quay lại trang trước đó
    }
  }
  return (
    <div data-vjs-player>
      <div ref={videoRef} />
      <div
        className={cn(
          'absolute z-10 space-x-4 top-8 left-8 flex items-center transition-["opacity"]  opacity-100 select-none',
          userActive && 'opacity-100 z-50',
        )}
      >
        <IcBackHistory
          className='text-white size-8 cursor-pointer'
          onClick={handleGoBack}
        />
        <span className='text-white text-lg'>{inforMovie?.title}</span>
      </div>
      {inforMovie?.type !== 'single' && (
        <div
          className={cn(
            'absolute z-50 group top-8 right-8 flex items-center transition-["opacity"] opacity-1 select-none',
            userActive && 'opacity-100 z-50',
          )}
        >
          <PopupListEpsiode
            listEpsiode={inforMovie?.seasons}
            t={t}
          />
        </div>
      )}
    </div>
  )
}
