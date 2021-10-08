import React, { FC } from 'react'
import { Chip } from '@mui/material'

type MuiChipProps = {
  label: string
}

const MuiChip: FC<MuiChipProps> = ({ label }) => {
  return <Chip clickable component="a" label={label} />
}

export default MuiChip
