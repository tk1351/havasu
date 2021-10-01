import { atom } from 'recoil'
import { CurrentUser } from '../../src/types/auth'

// undefined: ログインのチェックが終わっていない状態
// null: ログインチェック後、ログインしていない状態
export const currentUserState = atom<CurrentUser | undefined | null>({
  key: 'currentUserState',
  default: undefined,
})
