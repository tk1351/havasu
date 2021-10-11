import React, { FC } from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { editButton } from '../../styles/components/mui/muiEdit.styles'

type MuiEditProps = {
  onClick: () => void
}

const MuiEdit: FC<MuiEditProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <Edit css={editButton} />
    </IconButton>
  )
}

export default MuiEdit
