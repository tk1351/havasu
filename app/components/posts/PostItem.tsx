import React, { FC } from 'react'
import Link from 'next/link'
import { IPost } from '../../src/types/post'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'

type PostItemProps = {
  post: IPost
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const { id, title, createdAt } = post
  const { formatDate } = useUtcToZonedTime(createdAt)
  return (
    <div>
      <h2>
        <Link href={`/posts/${id}`}>
          <a>{title}</a>
        </Link>
      </h2>
      <p>{formatDate}</p>
    </div>
  )
}

export default PostItem
