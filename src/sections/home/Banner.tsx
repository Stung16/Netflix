/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Control_type from '@/components/banner/Control_type'
import InfoMovie from '@/components/banner/InfoMovie'
import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'

export default function Banner({dataBanner}: any) {
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true) // Mặc định tắt tiếng
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Lưu vị trí phát video
  const saveVideoPosition = () => {
    if (videoRef.current) {
      localStorage.setItem(
        'videoPosition',
        videoRef.current.currentTime.toString(),
      )
    }
  }

  // Xử lý khi video kết thúc
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
      video?.pause()
    }
  }, [])

  return (
    <section className='overflow-hidden h-[56.25rem] relative'>
      {isVideoEnded ? (
        <Image
          width={1500}
          height={800}
          src={dataBanner?.image_url}
          alt=''
          priority
          className='size-full object-cover'
        />
      ) : (
        <video
          ref={videoRef}
          src={dataBanner?.trailer}
          autoPlay
          muted={true} // Luôn tắt tiếng khi phát tự động
          onCanPlay={() => {
            videoRef.current?.play().catch(() => {
              console.warn('User interaction required to autoplay video.')
            })
          }}
          onEnded={handleVideoEnd}
          poster={dataBanner?.image_url}
          playsInline
          webkit-playsinline={true.toString()}
          className='object-cover size-full'
        />
      )}
      {/* informationMovieBanner */}
      <InfoMovie dataBanner={dataBanner} />
      {/* control&type */}
      <Control_type
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        videoRef={videoRef}
        isVideoEnded={isVideoEnded}
        setIsVideoEnded={setIsVideoEnded}
        age_rating={dataBanner?.age_rating}
      />
    </section>
  )
}
