/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  videoBanner: HTMLVideoElement | null
  isVideoEnd: boolean | null
  setVideoEnd: (action: boolean | null) => void // Chuyển kiểu 'any' thành 'boolean'
  setVideoBanner: (action: HTMLVideoElement) => void // Chuyển kiểu 'any' thành 'boolean'
}

const controlStore = create<Store>()((set) => ({
  videoBanner: null,
  isVideoEnd: false,
  setVideoEnd: (action: boolean | null) => set({isVideoEnd: action}),
  setVideoBanner: (action: HTMLVideoElement | null) =>
    set({videoBanner: action}),
}))

export default controlStore
