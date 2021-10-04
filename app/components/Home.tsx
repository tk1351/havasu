import React, { FC } from 'react'
import { IPost } from '../src/types/post'
import PostItem from './posts/PostItem'
import { Grid } from '@mui/material'

type HomeProps = {
  posts: IPost[]
}

const Home: FC<HomeProps> = ({ posts }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </Grid>
      <Grid item xs={4}>
        Category
      </Grid>
    </Grid>
  )
}

export default Home
