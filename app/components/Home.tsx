import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { IPost } from '../src/types/post'
import PostItem from './posts/PostItem'
import Tags from './tags/Tags'
import { CountTag } from '../src/types/tag'

type HomeProps = {
  posts: IPost[]
  postCount: number
  tags: CountTag[]
}

const Home: FC<HomeProps> = ({ posts, postCount, tags }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </Grid>
      <Tags tags={tags} />
    </Grid>
  )
}

export default Home
