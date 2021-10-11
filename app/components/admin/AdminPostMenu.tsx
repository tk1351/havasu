import React, { FC, useState } from 'react'
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

  const transitionToDelete = () => {
    router.push(`/posts/${postId}/delete`)
  }

  return (
    <>
      <MuiEdit onClick={transitionToUpdate} />
      <MuiDelete onClick={transitionToDelete} />
    </>
  )
}

export default AdminPostMenu
