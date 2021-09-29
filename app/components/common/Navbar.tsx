import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { api } from '../../src/utils/api/api'
import { isLoginState } from '../../src/recoil/atoms/isLogin'

type NavbarProps = {}

const Navbar: FC<NavbarProps> = () => {
  const router = useRouter()

  const { currentUser } = useCurrentUser()
  const setIsLogin = useSetRecoilState(isLoginState)

  const logout = async () => {
    await api.get<boolean>('/users/logout')
    await router.push('/')
    setIsLogin(false)
  }

  const authLinks = (
    <>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </>
  )

  const userLinks = (
    <>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
    </>
  )

  return <>{currentUser === null ? userLinks : authLinks}</>
}

export default Navbar
