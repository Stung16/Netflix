/* eslint-disable @typescript-eslint/no-explicit-any */
import {env} from './environment'

type Request = {
  api: string
  option?: any
}

export default async function getData(request: Request) {
  try {
    const res = await fetch(`${env.API}${request.api}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...request.option,
    })

    // Check if the response is not okay
    if (!res.ok) {
      return null
    }

    // Parse and return the JSON response
    return await res.json()
  } catch (error: unknown) {
    // Convert the error to a string or handle based on its type
    console.log(error)
  }
}
