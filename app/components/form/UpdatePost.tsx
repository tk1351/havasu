import React, { FC, ChangeEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { IPost } from '../../src/types/post'
import { PostInputs } from '../../src/types/input'
import MarkdownCheatSheet from './MarkdownCheatSheet'
import MuiTextField from '../mui/MuiTextField'
import MuiButton from '../mui/MuiButton'
import PostPreview from './PostPreview'
import { styles } from '../../styles/components/form/updatePost.styles'
import { alertState } from '../../recoil/atoms/alert'
import { updatePost } from '../../src/api/post'

type UpdatePostProps = {
  post: IPost
}

const UpdatePost: FC<UpdatePostProps> = ({ post }) => {
  const router = useRouter()

  const { id, title, content, tags } = post

  const defaultValues: PostInputs = {
    title,
    content,
    tags: tags,
  }

  const [markdown, setMarkdown] = useState<string>('')

  const setAlert = useSetRecoilState(alertState)

  const { control, handleSubmit } = useForm<PostInputs>({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray<PostInputs>({
    control,
    name: 'tags',
  })

  useEffect(() => {
    setMarkdown(content)
  }, [])

  const setContent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setMarkdown(e.target.value)
  }

  const openAlert = (msg: string, alertType: 'succeeded' | 'failed') => {
    setAlert({ msg, alertType, open: true })
  }

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    const successMessage = '更新が完了しました'
    try {
      await updatePost(data, id)
      openAlert(successMessage, 'succeeded')
      await router.push(`/posts/${id}`)
    } catch (e) {
      openAlert(e.response.data.message, 'failed')
    }
    console.log('data', data)
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

export default UpdatePost
