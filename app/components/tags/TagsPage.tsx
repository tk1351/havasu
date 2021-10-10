import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil'
import PostItem from '../posts/PostItem'
import Tags from './Tags'
import { CountTag } from '../../src/types/tag'
import { usePostsAndCount } from '../../hooks/usePostsAndCount'
import { pageState } from '../../recoil/atoms/page'
import { postsState } from '../../recoil/atoms/posts'
import { fetchPostsByTag } from '../../src/api/post'
import MuiPagination from '../mui/MuiPagination'

type TagsPageProps = {
  tags: CountTag[]
}

const TagsPage: FC<TagsPageProps> = ({ tags }) => {
  const router = useRouter()
  const tag = router.query?.tag as string

  const { data, postCount } = usePostsAndCount('tag', tag)

  const setPosts = useSetRecoilState(postsState)
  const [page, setPage] = useRecoilState(pageState)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await fetchPostsByTag(tag, page)
      const posts = res.data[0]
      setPosts(posts)
    })()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>
          タグ:{tag}の件数 {postCount}
        </h1>
        {data && data.map((post) => <PostItem post={post} key={post.id} />)}
        <MuiPagination count={postCount} />
      </Grid>
      <Tags tags={tags} />
    </Grid>
  )
}

export default TagsPage
