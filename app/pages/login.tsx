import React from 'react'
import { NextPage } from 'next'
import Login from '../components/auth/Login'
import { useNotRequireLogin } from '../hooks/useNotRequireLogin'

type LoginPageProps = {}

const login: NextPage<LoginPageProps> = () => {
  useNotRequireLogin()
  return (
    <>
      <Login />
    </>
  )
}

export default login
