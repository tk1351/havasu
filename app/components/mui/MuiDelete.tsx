import React, { FC } from 'react'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { deleteButton } from '../../styles/components/mui/muiDelete.styles'

type MuiDeleteProps = {
  postId: number
}

const MuiDelete: FC<MuiDeleteProps> = ({ postId }) => {
  const onClick = () => {
    console.log('postId', postId)
  }
  return (
    <IconButton onClick={onClick}>
      <Delete css={deleteButton} />
    </IconButton>
  )
}

export default MuiDelete
