'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Control_type from '@/components/banner/Control_type'
import InfoMovie from '@/components/banner/InfoMovie'
import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import controlStore from '@/app/(store)/control'
import {cn} from '@/lib/utils'

export default function Banner({
  dataBanner,
  t,
  lang,
}: {
  dataBanner: any
  t: any
  lang: string
}) {
  const [isMuted, setIsMuted] = useState<boolean>(true) // Mặc định tắt tiếng

  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Zustand store
  const {setVideoBanner, setVideoEnd, isVideoEnd} = controlStore()

  // Lưu vị trí phát video
  const saveVideoPosition = () => {
    if (videoRef.current) {
      localStorage.setItem(
        'videoPosition',
        videoRef.current.currentTime.toString(),
      )
    }
  }

  useEffect(() => {
    const video = videoRef.current
    // Khôi phục vị trí video
    if (video) {
      setVideoBanner(video)
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
      video?.pause()
      localStorage.removeItem('videoPosition')
    }
  }, [setVideoBanner])

  return (
    <section className='overflow-hidden h-[56.25rem] relative xsm:h-[15rem]'>
      <Image
        width={1500}
        height={800}
        src={dataBanner?.image_url}
        alt=''
        priority
        className={cn('size-full object-cover absolute', isVideoEnd && 'z-[9]')}
      />
      <video
        ref={videoRef}
        src={dataBanner?.trailer}
        autoPlay
        muted={isMuted} // Áp dụng trạng thái mute
        onCanPlay={() => {
          videoRef.current?.play().catch(() => {
            console.warn('User interaction required to autoplay video.')
          })
        }}
        onEnded={() => setVideoEnd(true)}
        poster={dataBanner?.image_url}
        playsInline
        webkit-playsinline={true.toString()}
        className={cn('object-cover size-full absolute', isVideoEnd && 'z-0')}
      />
      {/* informationMovieBanner */}
      <InfoMovie
        dataBanner={dataBanner}
        t={t}
        lang={lang}
      />
      {/* control&type */}
      <Control_type
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        videoRef={videoRef}
        age_rating={dataBanner?.age_rating}
      />
    </section>
  )
}
