import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser } from './useCurrentUser'

export const useNotRequireLogin = () => {
  const { isAuthChecking, currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthChecking) return
    if (currentUser) router.push('/') // 認証済みなら抜ける
  }, [isAuthChecking, currentUser])
}
