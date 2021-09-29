import React, { FC } from 'react'
import Link from 'next/link'

type NavbarProps = {}

const Navbar: FC<NavbarProps> = () => {
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

  return <div>{userLinks}</div>
}

export default Navbar
