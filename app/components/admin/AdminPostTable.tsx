import React, { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { IPost } from '../../src/types/post'
import { TableElements } from '../../src/types/table'
import MuiTable from '../mui/MuiTable'
import { useUtcToZonedTime } from '../../hooks/useUtcToZonedTime'
import MuiPagination from '../mui/MuiPagination'
import { postsState } from '../../recoil/atoms/posts'
import { pageState } from '../../recoil/atoms/page'
import { fetchPosts } from '../../src/api/post'

type AdminPostTableProps = {
  data: IPost[]
  postCount: number
}

const AdminPostTable: FC<AdminPostTableProps> = ({ data, postCount }) => {
  const [posts, setPosts] = useRecoilState(postsState)
  const [page, setPage] = useRecoilState(pageState)

  const element: TableElements = {
    mainRow: 'Title',
    subRows: ['Content', 'CreatedAt'],
    bodies: posts.map((post) => {
      const title = post.title
      const content = post.content.substr(0, 30)
      const { formatDate } = useUtcToZonedTime(post.createdAt)

      return { main: title, sub: [content, formatDate] }
    }),
  }

  useEffect(() => {
    setPosts(data)
    setPage(1)
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await fetchPosts(page)
      const posts = res.data[0]
      setPosts(posts)
    })()
  }, [page])

  return (
    <div>
      <MuiTable element={element} />
      <MuiPagination count={postCount} />
    </div>
  )
}

export default AdminPostTable
