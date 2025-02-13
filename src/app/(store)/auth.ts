/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  isAuth: boolean
  profile: any
  tStore: any
  setIsAuth: (isAuthNew: boolean) => void
  setProfile: (profile: any) => void
  setT: (profile: any) => void
}

const authStore = create<Store>()((set) => ({
  profile: null,
  isAuth: false,
  tStore: null,
  setProfile: (profileNew) => set({profile: profileNew}),
  setIsAuth: (auth) => set({isAuth: auth}),
  setT: (data: any) => set({tStore: data}),
}))

export default authStore
