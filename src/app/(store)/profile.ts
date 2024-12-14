/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {create} from 'zustand'

type Store = {
  // isAuth: boolean
  profile: any
  // setIsAuth: (isAuthNew: boolean) => void
  setProfile: (profile: any) => void
}

const useStore = create<Store>()((set) => ({
  profile: null,
  setProfile: (profileNew) => set({profile: profileNew}),
}))

export default useStore
