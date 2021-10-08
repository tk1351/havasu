import React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import axios from 'axios'
import Navbar from '../components/common/Navbar'
import SearchResult from '../components/search/SearchResult'
import { limit } from '../src/api/api'
import { CountTag } from '../src/types/tag'

const search: NextPage<Props> = ({ tags }) => {
  return (
    <>
      <Navbar />
      <SearchResult tags={tags} />
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

export default search
