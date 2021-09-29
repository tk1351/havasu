import React, { FC } from 'react'
import { Button } from '@material-ui/core'

type MuiButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'text' | 'outlined' | 'contained' | undefined
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  className?: string
  label: string
}

const MuiButton: FC<MuiButtonProps> = ({
  type,
  variant,
  color,
  className,
  label,
}) => {
  return (
    <Button type={type} variant={variant} color={color} className={className}>
      {label}
    </Button>
  )
}

export default MuiButton
