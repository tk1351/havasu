import { atom } from 'recoil'
import { Alert } from '../../src/types/alert'

export const defaultAlertState: Alert = {
  msg: '',
  alertType: undefined,
  open: false,
}

export const alertState = atom<Alert>({
  key: 'alertState',
  default: defaultAlertState,
})
