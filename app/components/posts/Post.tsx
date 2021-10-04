import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { IPost } from '../../src/types/post'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'
import PostContent from './PostContent'
import PostTags from './PostTags'

type PostProps = {
  post: IPost
}

const Post: FC<PostProps> = ({ post }) => {
  const { title, content, tags, createdAt } = post
  const { formatDate } = useUtcToZonedTime(createdAt)
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>{title}</h1>
        <p>{formatDate}</p>
        <div>
          <PostTags tags={tags} />
        </div>
        <div>
          <PostContent content={content} />
        </div>
      </Grid>
      <Grid item xs={4}>
        Category
      </Grid>
    </Grid>
  )
}

export default Post
