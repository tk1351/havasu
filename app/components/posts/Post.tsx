import React, { FC } from 'react'
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
    <div>
      <h1>{title}</h1>
      <p>{formatDate}</p>
      <div>
        <PostTags tags={tags} />
      </div>
      <div>
        <PostContent content={content} />
      </div>
    </div>
  )
}

export default Post
