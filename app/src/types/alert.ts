export type Alert = {
  msg: string
  alertType: 'succeeded' | 'failed' | undefined
  open: boolean
}
