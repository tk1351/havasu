import React from 'react'
import { FieldValues, ControllerProps, Controller } from 'react-hook-form'

type RhfTextFieldProps<T extends FieldValues> = ControllerProps<T>

const RhfTextField = <T extends FieldValues>(props: RhfTextFieldProps<T>) => {
  const { control, name, render } = props
  return <Controller name={name} control={control} render={render} />
}

export default RhfTextField
