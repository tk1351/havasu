import React, { FC } from 'react'
import { IPost } from '../src/types/post'
import PostItem from './posts/PostItem'

type HomeProps = {
  posts: IPost[]
}

const Home: FC<HomeProps> = ({ posts }) => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
