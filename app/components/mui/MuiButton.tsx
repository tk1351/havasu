import React, { FC } from 'react'
import { Button } from '@mui/material'

type MuiButtonProps = {
  variant: 'text' | 'outlined' | 'contained' | undefined
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
  type: 'button' | 'reset' | 'submit' | undefined
  label: string
  className?: string
  onClick?: () => void
}

const MuiButton: FC<MuiButtonProps> = ({
  variant,
  color,
  type,
  label,
  className,
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      className={className}
    >
      {label}
    </Button>
  )
}

export default MuiButton
