import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'
import { SnackbarOrigin, Snackbar, SnackbarContent } from '@mui/material'
import { alertState, defaultAlertState } from '../../recoil/atoms/alert'
import { succeeded, failed } from '../../styles/components/common/alert.styles'

type AlertProps = {}

const Alert: FC<AlertProps> = () => {
  const [alert, setAlert] = useRecoilState(alertState)

  const [state, setState] = useState<SnackbarOrigin>({
    vertical: 'bottom',
    horizontal: 'right',
  })
  const { vertical, horizontal } = state

  const handleClose = () => {
    setState({ ...state })
    setAlert(defaultAlertState)
  }

  return (
    <>
      {alert.open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={alert.open}
          key={vertical + horizontal}
          onClose={handleClose}
        >
          <SnackbarContent
            message={alert.msg}
            role="alert"
            css={alert.alertType === 'succeeded' ? succeeded : failed}
          />
        </Snackbar>
      )}
    </>
  )
}

export default Alert
