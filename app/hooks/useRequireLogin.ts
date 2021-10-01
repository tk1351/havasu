import { useRouter } from 'next/router'
import { useCurrentUser } from './useCurrentUser'
import { useEffect } from 'react'

type UseRequireLoginReturnType = void

export const useRequireLogin = (): UseRequireLoginReturnType => {
  const { currentUser, isAuthChecking } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthChecking) return
    if (!currentUser) router.push('/')
  }, [currentUser, isAuthChecking])
}
