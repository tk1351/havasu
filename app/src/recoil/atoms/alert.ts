import { atom } from 'recoil'

export type Alert = {
  msg: string
  alertType: 'succeeded' | 'failed' | undefined
  open: boolean
}

export const alertState = atom<Alert>({
  key: 'alertState',
  default: {
    msg: '',
    alertType: undefined,
    open: false,
  },
})
