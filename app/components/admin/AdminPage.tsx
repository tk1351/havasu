import React, { FC } from 'react'
import { IPost } from '../../src/types/post'
import AdminPostTable from './AdminPostTable'

type AdminPageProps = {
  data: IPost[]
  postCount: number
}

const AdminPage: FC<AdminPageProps> = ({ data, postCount }) => {
  return (
    <div>
      <h1>Admin</h1>
      <AdminPostTable data={data} postCount={postCount} />
    </div>
  )
}

export default AdminPage
