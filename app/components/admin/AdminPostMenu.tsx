import React, { FC } from 'react'
import { useRouter } from 'next/router'
import MuiEdit from '../mui/MuiEdit'
import MuiDelete from '../mui/MuiDelete'

type AdminPostMenuProps = {
  postId: number
}

const AdminPostMenu: FC<AdminPostMenuProps> = ({ postId }) => {
  const router = useRouter()

  const transitionToUpdate = () => {
    router.push(`/posts/${postId}/update`)
  }
  return (
    <>
      <MuiEdit onClick={transitionToUpdate} />
      <MuiDelete postId={postId} />
    </>
  )
}

export default AdminPostMenu
