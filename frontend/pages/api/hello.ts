import axios from 'axios'
import useSWR from 'swr'
import { api } from './useAxios'

type Test = { id: number; name: string }
type Response = {
  status: number
}

export const useApi = () => {
  const fetcher = (url: string): Promise<Test> => axios(url).then((res) => res.data)

  const { data, error } = useSWR('http://localhost:8000/api/hello', fetcher)

  const saveDate = async () => {
    // const fetcher = (url: string): Promise<Test> => axios(url).then((res) => res.data)

    // const { data, error } = useSWR('http://localhost:8000/api/hello', fetcher)
    const result: Response = await api.post(
      'hello',
      { test: 'test' },
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(result.status)
  }

  return { hello: data, isLoading: !error && !data, isError: error, saveDate }
}
