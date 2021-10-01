import { useRouter } from 'next/router'
import { useCurrentUser } from './useCurrentUser'
import { useEffect } from 'react'

type UseRequireVisitorReturnType = void

export const useRequireVisitor = (): UseRequireVisitorReturnType => {
  const { currentUser, isAuthChecking } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthChecking) return
    if (currentUser) router.push('/')
  }, [currentUser, isAuthChecking])
}
