import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Grid, Container } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginInputs } from '../../src/types/input'
import MuiTextField from '../mui/MuiTextField'
import MuiButton from '../mui/MuiButton'
import api from '../../src/api/api'
import { alertState } from '../../recoil/atoms/alert'
import { Token } from '../../src/types/auth'
import { isLoginState } from '../../recoil/atoms/isLogin'
import { styles } from '../../styles/components/auth/login.styles'
import { loginValidationSchema } from '../../src/utils/loginValidation'

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
    resolver: yupResolver(loginValidationSchema) as any,
  })

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

  const { container, textField } = styles

  return (
    <Container component="main" maxWidth={false} css={container}>
      <Grid container justifyContent="center">
        <h1>Login</h1>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={textField}>
          <Controller
            name="email"
            control={control}
            render={({ field, formState: { errors } }) => (
              <MuiTextField
                label="email"
                variant="outlined"
                type="text"
                field={field}
                onChange={field.onChange}
                fullWidth
                helperText={errors.email && errors.email.message}
                error={Boolean(errors.email)}
              />
            )}
          />
        </div>
        <div css={textField}>
          <Controller
            name="password"
            control={control}
            render={({ field, formState: { errors } }) => (
              <MuiTextField
                label="password"
                variant="outlined"
                type="password"
                field={field}
                onChange={field.onChange}
                fullWidth
                helperText={errors.password && errors.password.message}
                error={Boolean(errors.password)}
              />
            )}
          />
        </div>
        <div>
          <MuiButton
            variant="contained"
            color="primary"
            label="Login"
            type="submit"
            fullWidth
          />
        </div>
      </form>
    </Container>
  )
}

export default Login
