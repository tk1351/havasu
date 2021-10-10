import React, { FC } from 'react'
import { IPost } from '../../src/types/post'
import { TableElements } from '../../src/types/table'
import MuiTable from '../mui/MuiTable'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'

type AdminPostTableProps = {
  posts: IPost[]
}

const AdminPostTable: FC<AdminPostTableProps> = ({ posts }) => {
  const element: TableElements = {
    mainRow: 'Title',
    subRows: ['Content', 'CreatedAt'],
    bodies: posts.map((post) => {
      const title = post.title
      const content = post.content
      const { formatDate } = useUtcToZonedTime(post.createdAt)

      return { main: title, sub: [content, formatDate] }
    }),
  }
  return (
    <div>
      <MuiTable element={element} />
    </div>
  )
}

export default AdminPostTable
