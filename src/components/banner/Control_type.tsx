/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {memo, useCallback} from 'react'
import IcMutate from '@/components/icons/IcMutate'
import IcRePlay from '@/components/icons/IcRePlay'
import IcVolume from '@/components/icons/IcVolume'
import {cn} from '@/lib/utils'
import controlStore from '@/app/(store)/control'

const Control_type = memo(function Control_type({
  age_rating,
  setIsMuted,
  videoRef,
  isMuted,
  cls,
  clsIcon,
}: {
  age_rating?: string
  setIsMuted: (state: boolean) => void
  videoRef: React.RefObject<HTMLVideoElement>
  isMuted: boolean
  cls?: string
  clsIcon?: string
}) {
  // Bật tiếng
  const {videoBanner, isVideoEnd, setVideoEnd} = controlStore()

  const handleUnmute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }, [videoRef, setIsMuted])

  // Tắt tiếng
  const handleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }, [videoRef, setIsMuted])

  const handleReplay = () => {
    if (isVideoEnd) {
      if (videoBanner) {
        setVideoEnd(false)
        videoBanner?.play()
        videoBanner.currentTime = 0 // Đặt video về thời điểm bắt đầu
      }
    }
    return
  }

  return (
    <div
      className={cn(
        'flex items-center absolute justify-end z-10 right-0 top-[34rem] xsm:top-[11.5rem]',
        cls,
      )}
    >
      <div>
        <div
          className={cn(
            'cursor-pointer flex justify-center items-center mr-[1.1rem] xsm:mr-2 size-[2.4rem] xsm:size-7 bg-transparent border-[0.1rem] border-solid border-white rounded-full select-none',
            clsIcon && 'size-6',
          )}
          onClick={handleReplay}
        >
          {isVideoEnd ? (
            <IcRePlay
              className={cn('size-[1.4rem] text-white xsm:size-4', clsIcon)}
            />
          ) : !isMuted ? (
            <div onClick={handleMute}>
              <IcVolume
                className={cn('size-[1.4rem] text-white xsm:size-4', clsIcon)}
              />
            </div>
          ) : (
            <div onClick={handleUnmute}>
              <IcMutate
                className={cn('size-[1.4rem] text-white xsm:size-4', clsIcon)}
              />
            </div>
          )}
        </div>
      </div>
      {age_rating && (
        <div className='cursor-default text-white items-center bg-[rgba(51,51,51,0.6)] box-border flex text-[1.1rem] xsm:text-[0.6rem] xsm:h-7 h-[2.4rem] pl-[0.8rem] xsm:pl-[0.2rem] pr-[3.5rem] py-[0.5rem] border-l-[0.188rem] xsm:pr-[2rem]'>
          <span>{age_rating}</span>
        </div>
      )}
    </div>
  )
})

export default Control_type
