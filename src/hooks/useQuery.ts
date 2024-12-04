import {useState, useEffect} from 'react'

export const useQuery = <T>(queryFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await queryFn()
      setData(result)
      setError(null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) // Chỉ gọi fetchData 1 lần khi mount

  return {data, isLoading, error, refetch: fetchData}
}
