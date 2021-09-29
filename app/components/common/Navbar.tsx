import React, { FC } from 'react'
import Link from 'next/link'
import { useCurrentUser } from '../../hooks/useCurrentUser'

type NavbarProps = {}

const Navbar: FC<NavbarProps> = () => {
  const { currentUser } = useCurrentUser()

  const authLinks = (
    <>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>MyPage</a>
        </Link>
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

  return <>{currentUser === undefined || null ? userLinks : authLinks}</>
}

export default Navbar
