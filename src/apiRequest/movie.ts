/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/lib/http'

const movieApiRequest = {
  banner: () => http.get<any>('/banner'),
  Sbanner: (accessToken: string | undefined) =>
    http.get<any>('/banner', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  SgenreID: (
    id: string | number,
    accessToken: string | undefined,
    lang: string | undefined,
  ) =>
    http.get<any>(`/genre/${id}/${lang}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`genreID/${id}/${lang}`],
      },
    }),
  home: () => http.get<any>('/home'),
  genreID: (params: string) =>
    http.get<any>(`/genre/${params}`, {
      cache: 'no-store',
      next: {
        tags: [`genreID/${params}`],
      },
    }),
  Smovie: (accessToken: string | undefined, qs: string) =>
    http.get<any>(`/watch/${qs}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  addFavorite: (id: string | number) => http.get<any>(`/favorite/${id}`),
  deleteFavorite: (id: string | number) => http.delete<any>(`/favorite/${id}`),
  SgetFavorites: (accessToken: string | undefined) =>
    http.get<any>('/favorites', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`favorites`],
      },
    }),
  Ssearch: (accessToken: string | undefined, q: string) =>
    http.get<any>(`/search?q=${q}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`search`],
      },
    }),
}
export default movieApiRequest
