import React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import Navbar from '../components/common/Navbar'
import TagsPage from '../components/tags/TagsPage'
import { CountTag } from '../src/types/tag'
import { limit } from '../src/api/api'

const tags: NextPage<Props> = ({ tags }) => {
  return (
    <>
      <Navbar />
      <TagsPage tags={tags} />
    </>
  )
}

export const getStaticProps = async () => {
  const url = `${process.env.API_URL}/tags/count/${process.env.AUTHOR_ID}?limit=${limit}`

  const res = await axios.get<CountTag[]>(url)

  return {
    props: {
      tags: res.data,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default tags
