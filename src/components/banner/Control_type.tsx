/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import IcMutate from '@/components/icons/IcMutate'
import IcRePlay from '@/components/icons/IcRePlay'
import IcVolume from '@/components/icons/IcVolume'
export default function Control_type({
  isVideoEnded,
  setIsVideoEnded,
  age_rating,
  setIsMuted,
  videoRef,
  isMuted,
}: {
  isVideoEnded: boolean
  setIsVideoEnded: (state: boolean) => void
  age_rating?: string
  setIsMuted: any
  videoRef: any
  isMuted: boolean
}) {
  // Bật tiếng
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }

  // Tắt tiếng
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }

  return (
    <div className='flex items-center absolute justify-end z-10 right-0 top-[34rem]'>
      <div>
        <div
          className='cursor-pointer flex justify-center items-center mr-[1.1rem] size-[2.4rem] bg-transparent border-[0.1rem] border-solid border-white rounded-full select-none'
          onClick={() => {
            if (isVideoEnded) {
              return setIsVideoEnded(false)
            }
            // if (videoRef.current) {
            //   videoRef.current.muted = !videoRef.current.muted
            // }
          }}
        >
          {isVideoEnded ? (
            <IcRePlay className='size-[1.4rem] text-white' />
          ) : !isMuted ? (
            <div onClick={handleMute}>
              <IcVolume className='size-[1.4rem] text-white' />
            </div>
          ) : (
            <div onClick={handleUnmute}>
              <IcMutate className='size-[1.4rem] text-white' />
            </div>
          )}
        </div>
      </div>
      {age_rating && (
        <div className='cursor-default text-white items-center bg-[rgba(51,51,51,0.6)] box-border flex text-[1.1rem] h-[2.4rem] pl-[0.8rem] pr-[3.5rem] py-[0.5rem] border-l-[0.188rem]'>
          <span>{age_rating}</span>
        </div>
      )}
    </div>
  )
}
