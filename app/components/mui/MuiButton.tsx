import React, { FC } from 'react'
import { Button } from '@material-ui/core'

type MuiButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'text' | 'outlined' | 'contained' | undefined
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  className?: string
  label: string
  onClick?: () => void
}

const MuiButton: FC<MuiButtonProps> = ({
  type,
  variant,
  color,
  className,
  label,
  onClick,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      className={className}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default MuiButton
