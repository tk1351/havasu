import React from 'react'
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import axios from 'axios'
import Navbar from '../../../components/common/Navbar'
import { useRequireLogin } from '../../../hooks/useRequireLogin'
import { IPost } from '../../../src/types/post'
import AdminDeletePost from '../../../components/admin/AdminDeletePost'
import { CountTag } from '../../../src/types/tag'
import { limit } from '../../../src/api/api'

const deletePost: NextPage<Props> = ({ post, tags }) => {
  useRequireLogin()
  return (
    <>
      <Navbar />
      <AdminDeletePost post={post} tagColumn={tags} />
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

export const getStaticProps: GetStaticProps<{
  post: IPost
  tags: CountTag[]
}> = async (ctx) => {
  const postUrl = `${process.env.API_URL}/posts/get-one/${Number(
    ctx.params?.postId
  )}`
  const tagUrl = `${process.env.API_URL}/tags/count/${process.env.AUTHOR_ID}?limit=${limit}`

  const postRes = await axios.get<IPost>(postUrl)
  const tagRes = await axios.get<CountTag[]>(tagUrl)

  return {
    props: {
      post: postRes.data,
      tags: tagRes.data,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default deletePost
