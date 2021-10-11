import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { IPost } from '../../src/types/post'
import PostTags from './PostTags'
import PostContent from './PostContent'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'

type PostDetailProps = {
  post: IPost
}

const PostDetail: FC<PostDetailProps> = ({ post }) => {
  const { title, content, tags, createdAt } = post
  const { formatDate } = useUtcToZonedTime(createdAt)
  return (
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
  )
}

export default PostDetail
