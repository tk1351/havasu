import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { IPost } from '../src/types/post'
import { fetchPostsByTag, fetchSearchResult } from '../src/api/post'
import { postsState } from '../recoil/atoms/posts'

type UsePostsAndCountReturnType = {
  data: IPost[]
  postCount: number
}

export const usePostsAndCount = (
  category: 'tag' | 'search',
  query: string
): UsePostsAndCountReturnType => {
  const [data, setData] = useRecoilState<IPost[]>(postsState)
  const [postCount, setPostCount] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      if (category === 'tag') {
        const res = await fetchPostsByTag(query, 1)
        setData(res.data[0])
        setPostCount(res.data[1])
      }

      if (category === 'search') {
        const res = await fetchSearchResult(query, 1)
        setData(res.data[0])
        setPostCount(res.data[1])
      }
    })()
  }, [category, query])

  return { data, postCount }
}
