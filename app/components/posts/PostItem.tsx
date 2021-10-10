import React, { FC } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { IPost } from '../../src/types/post'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'
import { currentUserState } from '../../recoil/atoms/currentUser'
import AdminPostMenu from '../admin/AdminPostMenu'

type PostItemProps = {
  post: IPost
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const { id, title, createdAt } = post
  const { formatDate } = useUtcToZonedTime(createdAt)

  const currentUser = useRecoilValue(currentUserState)
  return (
    <div>
      <h2>
        <Link href={`/posts/${id}`}>
          <a>{title}</a>
        </Link>
      </h2>
      <p>{formatDate}</p>
      {currentUser && <AdminPostMenu postId={id} />}
    </div>
  )
}

export default PostItem
