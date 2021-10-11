import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { IPost } from '../../src/types/post'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'
import PostContent from './PostContent'
import PostTags from './PostTags'
import { CountTag } from '../../src/types/tag'
import Tags from '../tags/Tags'
import { currentUserState } from '../../recoil/atoms/currentUser'
import AdminPostMenu from '../admin/AdminPostMenu'

type PostProps = {
  post: IPost
  tagColumn: CountTag[]
}

const Post: FC<PostProps> = ({ post, tagColumn }) => {
  const currentUser = useRecoilValue(currentUserState)

  const { id, title, content, tags, createdAt } = post
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
        {currentUser && <AdminPostMenu postId={id} />}
      </Grid>
      <Tags tags={tagColumn} />
    </Grid>
  )
}

export default Post
