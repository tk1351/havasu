import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms/currentUser'
import { CurrentUser } from '../src/types/auth'

type UseCurrentUserReturnType = {
  currentUser: CurrentUser | null | undefined
  isAuthChecking: boolean
}

export const useCurrentUser = (): UseCurrentUserReturnType => {
  const currentUser = useRecoilValue(currentUserState)
  const isAuthChecking = currentUser === undefined

  return { currentUser, isAuthChecking }
}
