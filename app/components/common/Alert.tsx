import React, { FC, useState } from 'react'
import { SnackbarOrigin, Snackbar, SnackbarContent } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { alertState } from '../../src/recoil/atoms/alert'
import styles from '../../styles/components/common/alert.module.css'

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
    setAlert({
      msg: '',
      alertType: undefined,
      open: false,
    })
  }

  return (
    <>
      {alert.open === true && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={alert.open}
          key={vertical + horizontal}
          onClose={handleClose}
        >
          <SnackbarContent
            message={alert.msg}
            role="alert"
            className={
              alert.alertType === 'succeeded' ? styles.succeeded : styles.failed
            }
          />
        </Snackbar>
      )}
    </>
  )
}

export default Alert
