import React, { FC } from 'react'
import Link from 'next/link'
import { IPost } from '../../src/types/post'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'
import EditMenu from './EditMenu'
import { useCurrentUser } from '../../hooks/useCurrentUser'

type PostItemProps = {
  post: IPost
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const { formatDate } = useUtcToZonedTime(post.createdAt)
  const { currentUser } = useCurrentUser()
  return (
    <div>
      <h2>
        <Link href={`/posts/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <p>{formatDate}</p>
      {currentUser && (
        <div>
          <EditMenu />
        </div>
      )}
    </div>
  )
}

export default PostItem
