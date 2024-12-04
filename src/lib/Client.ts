import { HeadersType, OptionsType } from '@/types/https'
import { env } from '@/lib/environment'
// import { handleRefreshToken } from '../services/auth.service'
import Cookies from 'js-cookie'

const { API } = env
const Client = {
  api: API,
  token: Cookies.get('accessToken'),
  refreshToken: Cookies.get('refreshToken'),
  idProfile: Cookies.get('idProfile'),

  setUrl: function (url: string) {
    this.api = url
  },
  setToken: function (token: string) {
    this.token = token
  },
  setRefreshToken: function (refreshToken: string) {
    this.refreshToken = refreshToken
  },
  setIdProfile: function (idProfile: string) {
    this.idProfile = idProfile
  },
  send: async function (url: string, method = 'GET', body: any = null) {
    url = `${this.api}${url}`
    const headers: HeadersType = {
      'Content-Type': 'application/json'
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    if (this.idProfile) {
      headers['idProfile'] = this.idProfile
    }
    const options: OptionsType = {
      method,
      headers
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options as any)
    console.log(response)

    if (this.token && response.status === 401) {
      console.log('token hết hạn')

      // window.location.href = '/signin'
      // const payload = {
      //   refreshToken: Cookies.get('refreshToken')
      // }
      // try {
      //   const res = await handleRefreshToken(payload);
      //   console.log(res);
      //   if (res?.data?.status === 200) {
      //     this.token = res?.data?.token?.accessToken;
      //     Cookies.set("accessToken", res?.data?.token?.accessToken, {
      //       expires: 60 * 60 * 24 * 7,
      //     });
      //     Cookies.set("refreshToken", res?.data?.token?.refreshToken, {
      //       expires: 60 * 60 * 24 * 30,
      //     });
      //     return this.send("/user/profile", method, body);
      //   }
      //   // else {
      //   //   // return logOut();
      //   // }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    const data = await response.json()

    return { data, response }
  },

  get: function (url: string) {
    return this.send(url)
  },

  post: function (url: string, body: any) {
    return this.send(url, 'POST', body)
  },

  put: function (url: string, body: any) {
    return this.send(url, 'PUT', body)
  },

  patch: function (url: string, body: any) {
    return this.send(url, 'PATCH', body)
  },

  delete: function (url: string) {
    return this.send(url, 'DELETE')
  }
}

export default Client
