import React, { FC, ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Grid } from '@mui/material'
import MuiTextField from '../mui/MuiTextField'
import { PostInputs } from '../../src/types/input'
import MuiButton from '../mui/MuiButton'
import PostPreview from './PostPreview'
import { registerPost } from '../../src/api/post'
import { alertState } from '../../recoil/atoms/alert'
import MarkdownCheatSheet from './MarkdownCheatSheet'
import { styles } from '../../styles/components/form/newPost.styles'

type NewPostProps = {}

const defaultValues: PostInputs = {
  title: '',
  content: '',
  tags: [{ name: '' }],
}

const NewPost: FC<NewPostProps> = () => {
  const router = useRouter()

  const [markdown, setMarkdown] = useState<string>('')

  const setAlert = useSetRecoilState(alertState)

  const { control, handleSubmit } = useForm<PostInputs>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray<PostInputs>({
    control,
    name: 'tags',
  })

  const setContent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setMarkdown(e.target.value)
  }

  const openAlert = (msg: string, alertType: 'succeeded' | 'failed') => {
    setAlert({ msg, alertType, open: true })
  }

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    const successMessage = '投稿が完了しました'
    try {
      await registerPost(data)
      openAlert(successMessage, 'succeeded')
      await router.push('/')
    } catch (e) {
      openAlert(e.response.data.message, 'failed')
    }
  }

  const { header, textField, button, li } = styles

  return (
    <>
      <Grid container justifyContent="center" css={header}>
        <h1>New Post</h1>
        <MarkdownCheatSheet />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div css={textField}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <MuiTextField
                    field={field}
                    label="Title"
                    variant="outlined"
                    type="text"
                    onChange={field.onChange}
                    fullWidth
                  />
                )}
              />
            </div>
            <div css={textField}>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <MuiTextField
                    field={field}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setContent(e)
                      field.onChange(e)
                    }}
                    label="Content"
                    multiline={true}
                    rows={10}
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                )}
              />
            </div>
            <ul>
              {fields.map((field, i) => (
                <li key={field.id} css={li}>
                  <Controller
                    name={`tags.${i}.name`}
                    control={control}
                    render={({ field }) => (
                      <MuiTextField
                        field={field}
                        label="Tag"
                        variant="outlined"
                        type="text"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <MuiButton
                    variant="contained"
                    color="secondary"
                    label="Remove"
                    type="button"
                    onClick={() => remove(i)}
                  />
                </li>
              ))}
            </ul>
            <MuiButton
              variant="contained"
              color="primary"
              label="Append"
              type="button"
              onClick={() => append({ name: '' })}
              css={button}
            />
            <div>
              <MuiButton
                variant="contained"
                color="primary"
                label="Add"
                type="submit"
                fullWidth
              />
            </div>
          </form>
        </Grid>
        <Grid item xs={6}>
          <PostPreview content={markdown} />
        </Grid>
      </Grid>
    </>
  )
}

export default NewPost
