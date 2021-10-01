import React from 'react'
import { NextPage } from 'next'
import Login from '../components/auth/Login'
import Navbar from '../components/common/Navbar'

type LoginPageProps = {}

const login: NextPage<LoginPageProps> = () => {
  return (
    <>
      <Navbar />
      <Login />
    </>
  )
}

export default login
