import { useState, useEffect } from 'react'
import { IPost } from '../src/types/post'
import { fetchPostsByTag, fetchSearchResult } from '../src/api/post'

type UsePostsAndCountReturnType = {
  posts: IPost[]
  count: number
}

export const usePostsAndCount = (
  category: 'tag' | 'search',
  query: string
): UsePostsAndCountReturnType => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      if (category === 'tag') {
        const res = await fetchPostsByTag(query)
        setPosts(res.data[0])
        setCount(res.data[1])
      }

      if (category === 'search') {
        const res = await fetchSearchResult(query)
        setPosts(res.data[0])
        setCount(res.data[1])
      }
    })()
  }, [category, query])

  return { posts, count }
}
