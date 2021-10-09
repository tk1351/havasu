import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import PostItem from '../posts/PostItem'
import Tags from './Tags'
import { CountTag } from '../../src/types/tag'
import { usePostsAndCount } from '../../hooks/usePostsAndCount'

type TagsPageProps = {
  tags: CountTag[]
}

const TagsPage: FC<TagsPageProps> = ({ tags }) => {
  const router = useRouter()
  const tag = router.query?.tag as string

  const { posts, count } = usePostsAndCount('tag', tag)

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>
          タグ:{tag}の件数 {count}
        </h1>
        {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
      </Grid>
      <Tags tags={tags} />
    </Grid>
  )
}

export default TagsPage
