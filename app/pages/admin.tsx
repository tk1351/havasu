import React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import { useRequireLogin } from '../hooks/useRequireLogin'
import Navbar from '../components/common/Navbar'
import AdminPage from '../components/admin/AdminPage'
import { offset, limit } from '../src/api/api'
import { IPost } from '../src/types/post'

const admin: NextPage<Props> = ({ data, postCount }) => {
  useRequireLogin()
  return (
    <>
      <Navbar />
      <AdminPage data={data} postCount={postCount} />
    </>
  )
}

export const getStaticProps = async () => {
  const url = `${process.env.API_URL}/posts/${process.env.AUTHOR_ID}?offset=${offset}&limit=${limit}`

  const res = await axios.get<[IPost[], number]>(url)

  return {
    props: {
      data: res.data[0],
      postCount: res.data[1],
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default admin
