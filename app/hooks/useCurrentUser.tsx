import { useRecoilValue } from 'recoil'
import { currentUserState } from '../src/recoil/atoms/currentUser'
import { CurrentUser } from '../src/types/user'

type UseCurrentUserReturnType = {
  currentUser: CurrentUser | undefined | null
  isAuthChecking: boolean
}

export const useCurrentUser = (): UseCurrentUserReturnType => {
  const currentUser = useRecoilValue(currentUserState)
  const isAuthChecking = currentUser === undefined

  return { currentUser, isAuthChecking }
}
