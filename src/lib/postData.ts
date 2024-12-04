/* eslint-disable @typescript-eslint/no-explicit-any */
import {env} from 'process'

export type RequestPostGuest = {
  api: string
  body: any
  headers?: any
}

export default async function postData(request: RequestPostGuest) {
  try {
    const res = await fetch(`${env.API}${request.api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...request.headers,
      },
      body: request.body,
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      return res.json()
    }

    return res.json()
  } catch (error: unknown) {
    // Convert the error to a string or handle based on its type
    console.log(error)
  }
}
