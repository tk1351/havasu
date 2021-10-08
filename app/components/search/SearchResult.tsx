import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import { fetchSearchResult } from '../../src/api/post'
import { IPost } from '../../src/types/post'
import Tags from '../tags/Tags'
import PostItem from '../posts/PostItem'
import { CountTag } from '../../src/types/tag'

type SearchResultProps = {
  tags: CountTag[]
}

const SearchResult: FC<SearchResultProps> = ({ tags }) => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [count, setCount] = useState<number>(0)

  const router = useRouter()
  const query = router.query?.query as string

  useEffect(() => {
    ;(async () => {
      const res = await fetchSearchResult(query)
      setPosts(res.data[0])
      setCount(res.data[1])
    })()
  }, [query])

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>
          {query}の件数 {count}
        </h1>
        {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
      </Grid>
      <Tags tags={tags} />
    </Grid>
  )
}

export default SearchResult
