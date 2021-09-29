import * as yup from 'yup'

const requireTitle = 'タイトルを入力してください'
const requireContentText = 'テキストを入力してください'
const requireTagName = 'タグを入力してください'

export const newPostValidationSchema = yup.object().shape({
  title: yup.string().required(requireTitle),
  contents: yup.array(
    yup.object().shape({ text: yup.string().required(requireContentText) })
  ),
  tags: yup.array(
    yup.object().shape({ name: yup.string().required(requireTagName) })
  ),
})
