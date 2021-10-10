import React, { FC, useEffect } from 'react'
import { Grid } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IPost } from '../src/types/post'
import PostItem from './posts/PostItem'
import Tags from './tags/Tags'
import { CountTag } from '../src/types/tag'
import MuiPagination from './mui/MuiPagination'
import { postsState } from '../recoil/atoms/posts'
import { pageState } from '../recoil/atoms/page'
import { fetchPosts } from '../src/api/post'

type HomeProps = {
  data: IPost[]
  postCount: number
  tags: CountTag[]
}

const Home: FC<HomeProps> = ({ data, postCount, tags }) => {
  const [posts, setPosts] = useRecoilState(postsState)
  const page = useRecoilValue(pageState)

  // レンダリング時のみSSGで取得したdataをstateへ保存する
  useEffect(() => {
    setPosts(data)
  }, [])

  // ページネーション利用時にpostsをstateへ保存する
  useEffect(() => {
    ;(async () => {
      const res = await fetchPosts(page)
      const posts = res.data[0]
      setPosts(posts)
    })()
  }, [page])

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
        <MuiPagination count={postCount} />
      </Grid>
      <Tags tags={tags} />
    </Grid>
  )
}

export default Home
