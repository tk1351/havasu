import React, { FC } from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { editButton } from '../../styles/components/mui/muiEdit.styles'

type MuiEditProps = {
  postId: number
}

const MuiEdit: FC<MuiEditProps> = ({ postId }) => {
  const onClick = () => {
    console.log('postId', postId)
  }
  return (
    <IconButton onClick={onClick}>
      <Edit css={editButton} />
    </IconButton>
  )
}

export default MuiEdit
