import React, { FC } from 'react'
import { IPost } from '../../src/types/post'
import PostItem from './PostItem'

type PostsProps = {
  posts: IPost[]
}

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
