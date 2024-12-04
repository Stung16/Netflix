import movieApiRequest from '@/apiRequest/movie'
import {useQuery} from '@/hooks/useQuery'

export const useHomeQuery = () => {
  const fetchBanner = async () => {
    const res = await movieApiRequest.home()
    if (res.status !== 200) {
      throw new Error(res.payload?.message || 'Không thể tải banner')
    }
    return res.payload
  }

  return useQuery(fetchBanner)
}
export const useGenreQuery = (id: string) => {
  const fetchBanner = async () => {
    const res = await movieApiRequest.genreID(id)
    if (res.status !== 200 && res.status !== 401) {
      throw new Error(res.payload?.message || 'Không thể tải banner')
    }
    return res.payload
  }

  return useQuery(fetchBanner)
}

// export const useAddFavorie = (id: string | number) => {
//   const fetchBanner = async () => {
//     const res = await movieApiRequest.genreID(id)
//     if (res.status !== 200 && res.status !== 401) {
//       throw new Error(res.payload?.message || 'Không thể tải banner')
//     }
//     return res.payload
//   }

//   return useQuery(fetchBanner)
// }
