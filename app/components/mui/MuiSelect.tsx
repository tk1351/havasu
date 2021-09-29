import React, { FC } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core'

type MuiSelectProps = {
  className?: string
  inputLabel: string
  label: string
  name: string
  onChange: (...event: any[]) => void
  value: any
  error?: boolean
  menuItems: string[]
  helperText?: string
}

const MuiSelect: FC<MuiSelectProps> = ({
  className,
  inputLabel,
  label,
  name,
  onChange,
  value,
  error,
  menuItems,
  helperText,
}) => {
  return (
    <FormControl className={className}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        label={label}
        name={name}
        onChange={onChange}
        value={value ? value : 1}
        error={error}
      >
        {menuItems.map((menuItem, i) => (
          <MenuItem key={i} value={i + 1}>
            {menuItem}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default MuiSelect
