import React, { FC } from 'react'
import MuiEdit from '../mui/MuiEdit'
import MuiDelete from '../mui/MuiDelete'

type AdminPostMenuProps = {
  postId: number
}

const AdminPostMenu: FC<AdminPostMenuProps> = ({ postId }) => {
  return (
    <>
      <MuiEdit postId={postId} />
      <MuiDelete postId={postId} />
    </>
  )
}

export default AdminPostMenu
