import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import Tags from '../tags/Tags'
import PostItem from '../posts/PostItem'
import { CountTag } from '../../src/types/tag'
import { usePostsAndCount } from '../../hooks/usePostsAndCount'

type SearchResultProps = {
  tags: CountTag[]
}

const SearchResult: FC<SearchResultProps> = ({ tags }) => {
  const router = useRouter()
  const query = router.query?.query as string

  const { posts, count } = usePostsAndCount('search', query)

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
