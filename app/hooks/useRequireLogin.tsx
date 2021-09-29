import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser } from './useCurrentUser'

export const useRequireLogin = () => {
  const { isAuthChecking, currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthChecking) return
    if (!currentUser) router.push('/login') // 未ログインであればリダイレクト
  }, [isAuthChecking, currentUser])
}
