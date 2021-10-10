import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Tags from '../tags/Tags'
import PostItem from '../posts/PostItem'
import { CountTag } from '../../src/types/tag'
import { usePostsAndCount } from '../../hooks/usePostsAndCount'
import MuiPagination from '../mui/MuiPagination'
import { pageState } from '../../recoil/atoms/page'
import { postsState } from '../../recoil/atoms/posts'
import { fetchSearchResult } from '../../src/api/post'

type SearchResultProps = {
  tags: CountTag[]
}

const SearchResult: FC<SearchResultProps> = ({ tags }) => {
  const router = useRouter()
  const query = router.query?.query as string

  const { data, postCount } = usePostsAndCount('search', query)

  const setPosts = useSetRecoilState(postsState)
  const [page, setPage] = useRecoilState(pageState)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await fetchSearchResult(query, page)
      const searchResult = res.data[0]
      setPosts(searchResult)
    })()
  }, [page])

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>
          {query}の件数 {postCount}
        </h1>
        {data && data.map((post) => <PostItem post={post} key={post.id} />)}
        <MuiPagination count={postCount} />
      </Grid>
      <Tags tags={tags} />
    </Grid>
  )
}

export default SearchResult
