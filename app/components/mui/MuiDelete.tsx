import React, { FC } from 'react'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { deleteButton } from '../../styles/components/mui/muiDelete.styles'

type MuiDeleteProps = {
  onClick: () => void
}

const MuiDelete: FC<MuiDeleteProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <Delete css={deleteButton} />
    </IconButton>
  )
}

export default MuiDelete
