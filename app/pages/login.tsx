import React from 'react'
import { NextPage } from 'next'
import Login from '../components/auth/Login'

type LoginPageProps = {}

const login: NextPage<LoginPageProps> = () => {
  return (
    <>
      <Login />
    </>
  )
}

export default login
