import React, { FC, useState, useEffect, memo } from 'react'
import { Pagination } from '@mui/material'
import { useRecoilState } from 'recoil'
import { limit } from '../../src/api/api'
import { pageState } from '../../recoil/atoms/page'

type MuiPaginationProps = {
  count: number
}
const perPage = limit

const MuiPagination: FC<MuiPaginationProps> = memo(({ count }) => {
  const [page, setPage] = useRecoilState(pageState)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(Math.ceil(count / perPage))
  }, [])

  return (
    <Pagination
      count={total}
      page={page}
      onChange={(e, page) => setPage(page)}
    />
  )
})

export default memo(MuiPagination)
