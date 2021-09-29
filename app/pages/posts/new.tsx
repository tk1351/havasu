import React from 'react'
import { NextPage } from 'next'
import NewPost from '../../components/posts/NewPost'
import { useRequireLogin } from '../../hooks/useRequireLogin'

type NewPostsPageProps = {}

const newPosts: NextPage<NewPostsPageProps> = () => {
  useRequireLogin()
  return (
    <>
      <NewPost />
    </>
  )
}

export default newPosts
