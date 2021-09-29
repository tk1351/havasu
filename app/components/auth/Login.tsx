import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSetRecoilState } from 'recoil'
import RhfTextField from '../form/RhfTextField'
import MuiButton from '../mui/MuiButton'
import MuiTextField from '../mui/MuiTextField'
import { loginValidationSchema } from '../../src/utils/loginValidation'
import { alertState } from '../../src/recoil/atoms/alert'
import { LoginInputs } from '../../src/types/form'
import { api } from '../../src/utils/api/api'
import { isLoginState } from '../../src/recoil/atoms/isLogin'

type LoginProps = {}

const defaultValues: LoginInputs = {
  email: '',
  password: '',
}

const Login: FC<LoginProps> = () => {
  const router = useRouter()

  const setAlert = useSetRecoilState(alertState)
  const setIsLogin = useSetRecoilState(isLoginState)

  const { control, handleSubmit } = useForm<LoginInputs>({
    defaultValues,
    // FIXME: resolverで謎の型エラー
    resolver: yupResolver(loginValidationSchema) as any,
  })

  const openAlert = (msg: string, alertType: 'succeeded' | 'failed') => {
    setAlert({
      msg,
      alertType,
      open: true,
    })
  }

  const login = async (data: LoginInputs) => {
    try {
      await api.post<{ token: string }>('/users/login', data)
      setIsLogin(true)
      await router.push('/')
    } catch (e) {
      const msg: string = e.response.data.message
      openAlert(msg, 'failed')
    }
  }

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    login(data)
  }
  return (
    <>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RhfTextField
            control={control}
            name="email"
            render={({ field, formState: { errors } }) => (
              <MuiTextField
                field={field}
                formState={errors}
                variant="outlined"
                label="email"
                type="text"
                helperText={errors.email && errors.email.message}
                error={Boolean(errors.email)}
              />
            )}
          />
          <div>
            <RhfTextField
              control={control}
              name="password"
              render={({ field, formState: { errors } }) => (
                <MuiTextField
                  field={field}
                  formState={errors}
                  variant="outlined"
                  label="password"
                  type="password"
                  helperText={errors.password && errors.password.message}
                  error={Boolean(errors.password)}
                />
              )}
            />
          </div>
          <MuiButton
            type="submit"
            variant="contained"
            color="primary"
            label="login"
          />
        </form>
      </div>
    </>
  )
}

export default Login
