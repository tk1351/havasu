import React, { FC } from 'react'
import { useRouter } from 'next/router'
import MuiButton from '../mui/MuiButton'

type RouterButtonProps = {
  label: string
  routerURL: string
}

const RouterButton: FC<RouterButtonProps> = ({ label, routerURL }) => {
  const router = useRouter()

  const onClick = () => {
    router.push(routerURL)
  }
  return (
    <MuiButton
      type="button"
      variant="text"
      color="default"
      label={label}
      onClick={onClick}
    />
  )
}

export default RouterButton
