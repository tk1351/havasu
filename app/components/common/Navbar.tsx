import React, { FC } from 'react'
import Link from 'next/link'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { isLoginState } from '../../recoil/atoms/isLogin'
import MuiButton from '../mui/MuiButton'
import { currentUserState } from '../../recoil/atoms/currentUser'

type NavbarProps = {}

const Navbar: FC<NavbarProps> = () => {
  const currentUser = useRecoilValue(currentUserState)

  const logout = async () => {
    console.log('logout')
  }

  const visitorLinks = (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  )

  const authorLinks = (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <MuiButton
        variant="text"
        color="inherit"
        label="Logout"
        type="button"
        onClick={logout}
      />
    </>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Typography>
          {currentUser ? authorLinks : visitorLinks}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
