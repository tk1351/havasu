import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import MuiButton from '../mui/MuiButton'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { isLoginState } from '../../recoil/atoms/isLogin'
import api from '../../src/api/api'
import { styles } from '../../styles/components/common/navbar.styles'

type NavbarProps = {}

const Navbar: FC<NavbarProps> = () => {
  const router = useRouter()

  const { currentUser } = useCurrentUser()
  const setIsLogin = useSetRecoilState(isLoginState)

  const logout = async () => {
    await api.get<boolean>('/users/logout')
    setIsLogin(false)
    await router.push('/')
  }

  const { links, toolbar } = styles

  const visitorLinks = (
    <div css={links}>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  )

  const authorLinks = (
    <div css={links}>
      <Link href="/posts/new">
        <a>Add new</a>
      </Link>
      <MuiButton
        variant="text"
        color="inherit"
        label="Logout"
        type="button"
        onClick={logout}
      />
    </div>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar css={toolbar}>
          <Typography variant="h6" noWrap component="div">
            <Link href="/">
              <a>{process.env.NEXT_PUBLIC_APP_NAME}</a>
            </Link>
          </Typography>
          {currentUser ? authorLinks : visitorLinks}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
