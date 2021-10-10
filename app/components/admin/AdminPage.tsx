import React, { FC } from 'react'
import { IPost } from '../../src/types/post'
import AdminPostTable from './AdminPostTable'

type AdminPageProps = {
  posts: IPost[]
  count: number
}

const AdminPage: FC<AdminPageProps> = ({ posts, count }) => {
  console.log(posts, count)

  return (
    <div>
      <h1>Admin</h1>
      <AdminPostTable posts={posts} />
    </div>
  )
}

export default AdminPage
