import React from 'react'
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import axios from 'axios'
import Navbar from '../../../components/common/Navbar'
import { IPost } from '../../../src/types/post'
import UpdatePost from '../../../components/form/UpdatePost'
import { useRequireLogin } from '../../../hooks/useRequireLogin'

const update: NextPage<Props> = ({ post }) => {
  useRequireLogin()
  return (
    <>
      <Navbar />
      <UpdatePost post={post} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const url = `${process.env.API_URL}/posts/${process.env.AUTHOR_ID}`
  const res = await axios.get<[IPost[], number]>(url)
  const posts = res.data[0]

  const paths = posts.map((post) => ({
    params: { postId: post.id.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ post: IPost }> = async (ctx) => {
  const url = `${process.env.API_URL}/posts/get-one/${Number(
    ctx.params?.postId
  )}`
  const res = await axios.get<IPost>(url)

  return {
    props: { post: res.data },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default update
