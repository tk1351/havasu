import React, { FC } from 'react'
import { TextField } from '@mui/material'
import { ControllerRenderProps, FormState } from 'react-hook-form'
import { InputType } from '../../src/types/input'

type MuiTextFieldProps = {
  field?: ControllerRenderProps<any>
  formState?: FormState<any>
  variant: 'standard' | 'outlined' | 'filled' | undefined
  label: string
  className?: string
  type: InputType
  helperText?: any
  error?: boolean
  multiline?: boolean
  rows?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  fullWidth?: boolean
}

const MuiTextField: FC<MuiTextFieldProps> = ({
  field,
  formState,
  variant,
  label,
  className,
  type,
  helperText,
  error,
  multiline,
  rows,
  onChange,
  fullWidth,
}) => {
  return (
    <TextField
      {...field}
      {...formState}
      variant={variant}
      label={label}
      className={className}
      type={type}
      helperText={helperText}
      error={error}
      multiline={multiline}
      rows={rows}
      onChange={onChange}
      fullWidth={fullWidth}
    />
  )
}

export default MuiTextField
