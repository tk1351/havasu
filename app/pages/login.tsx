import React from 'react'
import { NextPage } from 'next'
import Login from '../components/auth/Login'
import Navbar from '../components/common/Navbar'
import { useRequireVisitor } from '../hooks/useRequireVisitor'

type LoginPageProps = {}

const login: NextPage<LoginPageProps> = () => {
  useRequireVisitor()
  return (
    <>
      <Navbar />
      <Login />
    </>
  )
}

export default login
