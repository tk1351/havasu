import React, { FC } from 'react'
import { ControllerRenderProps, FormState } from 'react-hook-form'
import { LoginInputs, InputType } from '../../src/utils/types'
import { TextField } from '@material-ui/core'

type MuiTextFieldProps = {
  field?: ControllerRenderProps<LoginInputs, any>
  formState?: FormState<LoginInputs>
  variant?: 'standard' | 'outlined' | 'filled' | undefined
  label?: string
  className?: string
  type?: InputType
  helperText?: any
  error?: boolean
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
    />
  )
}

export default MuiTextField
