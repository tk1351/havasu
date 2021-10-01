import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import NewPost from '../../components/form/NewPost'
import { useRequireLogin } from '../../hooks/useRequireLogin'

type NewPostPageProps = {}

const newPost: NextPage<NewPostPageProps> = () => {
  useRequireLogin()
  return (
    <>
      <Navbar />
      <NewPost />
    </>
  )
}

export default newPost
