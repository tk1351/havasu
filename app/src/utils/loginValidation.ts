import * as yup from 'yup'

const requireEmail = 'メールアドレスを入力してください'
const requirePassword = 'パスワードを入力してください'

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required(requireEmail),
  password: yup.string().required(requirePassword),
})
