import React, { FC } from 'react'
import { IPost } from '../../src/types/post'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'
import PostContents from './PostContents'
import PostTags from './PostTags'
import RouterButton from '../common/RouterButton'

type PostProps = {
  post: IPost
}

const Post: FC<PostProps> = ({ post }) => {
  const { formatDate } = useUtcToZonedTime(post.createdAt)
  const { tags, contents } = post
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{formatDate}</p>
      <PostTags tags={tags} />
      <PostContents contents={contents} />
      <div>
        <RouterButton label="戻る" routerURL="/" />
      </div>
    </div>
  )
}

export default Post
