import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { LoginInputs } from '../../src/types/input'
import MuiTextField from '../mui/MuiTextField'
import MuiButton from '../mui/MuiButton'
import api from '../../src/api/api'
import { alertState } from '../../recoil/atoms/alert'
import { Token } from '../../src/types/auth'
import { isLoginState } from '../../recoil/atoms/isLogin'

type LoginProps = {}

const defaultValues: LoginInputs = {
  email: '',
  password: '',
}

const Login: FC<LoginProps> = () => {
  const router = useRouter()

  const setAlert = useSetRecoilState(alertState)
  const setIsLogin = useSetRecoilState(isLoginState)

  const { control, handleSubmit } = useForm<LoginInputs>({ defaultValues })

  const openAlert = (msg: string, alertType: 'succeeded' | 'failed') => {
    setAlert({ msg, alertType, open: true })
  }

  const login = async (data: LoginInputs) => {
    try {
      await api.post<Token>('/users/login', data)
      setIsLogin(true)
      await router.push('/')
    } catch (e) {
      openAlert(e.response.data.message, 'failed')
    }
  }

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await login(data)
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <MuiTextField
              label="email"
              variant="outlined"
              type="text"
              field={field}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <MuiTextField
              label="password"
              variant="outlined"
              type="password"
              field={field}
              onChange={field.onChange}
            />
          )}
        />
        <MuiButton
          variant="contained"
          color="primary"
          label="Login"
          type="submit"
        />
      </form>
    </div>
  )
}

export default Login
