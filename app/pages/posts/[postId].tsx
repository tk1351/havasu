import React from 'react'
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import axios from 'axios'
import Post from '../../components/posts/Post'
import { authorId } from '../../src/utils/api/api'
import { IPost } from '../../src/types/post'

const postId: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Post post={post} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const url = `${process.env.API_URL}/posts/${authorId}`
  const res = await axios.get<IPost[]>(url)
  const posts = res.data

  const paths = posts.map((post) => ({
    params: { postId: post.id.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  { post: IPost },
  { postId: string }
> = async (ctx) => {
  const url = `${process.env.API_URL}/posts/get-one/${Number(
    ctx.params?.postId
  )}`
  const res = await axios.get<IPost>(url)
  return {
    props: { post: res.data },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default postId
