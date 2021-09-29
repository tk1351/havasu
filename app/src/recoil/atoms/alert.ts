import { atom } from 'recoil'
import { Alert } from '../../types/alert'

export const alertState = atom<Alert>({
  key: 'alertState',
  default: {
    msg: '',
    alertType: undefined,
    open: false,
  },
})
