import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { IPost } from '../../src/types/post'
import { CountTag } from '../../src/types/tag'
import Tags from '../tags/Tags'
import { currentUserState } from '../../recoil/atoms/currentUser'
import AdminPostMenu from '../admin/AdminPostMenu'
import PostDetail from './PostDetail'

type PostProps = {
  post: IPost
  tagColumn: CountTag[]
}

const Post: FC<PostProps> = ({ post, tagColumn }) => {
  const currentUser = useRecoilValue(currentUserState)

  const { id } = post
  return (
    <Grid container spacing={2}>
      <PostDetail post={post} />
      {currentUser && <AdminPostMenu postId={id} />}
      <Tags tags={tagColumn} />
    </Grid>
  )
}

export default Post
