import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import { fetchPosts } from '../../src/api/post'
import { IPost } from '../../src/types/post'
import PostItem from '../posts/PostItem'
import Tags from './Tags'
import { CountTag } from '../../src/types/tag'

type TagsPageProps = {
  tags: CountTag[]
}

const TagsPage: FC<TagsPageProps> = ({ tags }) => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [count, setCount] = useState<number>(0)

  const router = useRouter()
  const tag = router.query?.tag as string

  useEffect(() => {
    ;(async () => {
      const res = await fetchPosts(tag)
      setPosts(res.data[0])
      setCount(res.data[1])
    })()
  }, [tag])

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>
          タグ:{tag}の件数 {count}
        </h1>
        {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
      </Grid>
      <Tags tags={tags} />
    </Grid>
  )
}

export default TagsPage
