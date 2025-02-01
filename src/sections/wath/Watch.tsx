/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import VideoPlayer from '@/components/movie/VideoPlayer/VideoPlayer'
import {useRef} from 'react'
import videojs from 'video.js' // Import types from video.js

function getAllEpisodes(data: any) {
  const episodes = []

  // Duyệt qua các season
  if (Array.isArray(data?.seasons)) {
    for (const season of data?.seasons) {
      // Duyệt qua các episode trong season
      if (Array.isArray(season?.episodes)) {
        for (const episode of season?.episodes) {
          episodes.push(episode)
        }
      }
    }
  }

  return episodes
}

export default function Watch({
  t,
  movieId,
  trackId,
  dataMovie,
}: {
  t: any
  movieId: string | number
  trackId: string | number
  dataMovie: any
}) {
  console.log(dataMovie)

  const Episodes = getAllEpisodes(dataMovie)
  const EpisodeCurrent = Episodes.find((item: any) => item.id === trackId)
  //
  const playerRef = useRef<HTMLVideoElement | null>(null) // Type for the player ref
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    preload: 'auto',
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      volumePanel: {inline: false},
    },
    userActions: {
      doubleClick: true, // Cho phép double-click để vào toàn màn hình
      hotkeys: true, // Hỗ trợ các phím tắt
    },
    sources: [
      {
        src: EpisodeCurrent?.video_url || '',
        type: 'video/mp4',
      },
    ],
    poster: dataMovie?.image_url,
  }

  const handlePlayerReady = (player: typeof videojs.players) => {
    playerRef.current = player

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting')
    })

    player.on('dispose', () => {
      videojs.log('player will dispose')
    })
  }

  return (
    <VideoPlayer
      t={t}
      options={videoJsOptions}
      onReady={handlePlayerReady}
      inforEpisodes={EpisodeCurrent}
      inforMovie={dataMovie}
    />
  )
}
