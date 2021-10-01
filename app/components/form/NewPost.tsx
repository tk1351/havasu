import React, { FC, ChangeEvent, useState } from 'react'
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import MuiTextField from '../mui/MuiTextField'
import { PostInputs } from '../../src/types/input'
import MuiButton from '../mui/MuiButton'
import PostPreview from './PostPreview'
import { registerPost } from '../../src/api/post'
import { alertState } from '../../recoil/atoms/alert'

type NewPostProps = {}

const defaultValues: PostInputs = {
  title: '',
  content: '',
  tags: [{ name: '' }],
}

const NewPost: FC<NewPostProps> = () => {
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
    try {
      const res = await registerPost(data)
      openAlert(String(res.data), 'succeeded')
    } catch (e) {
      openAlert(e.response.data.message, 'failed')
    }
  }
  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            />
          )}
        />
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
            />
          )}
        />
        <ul>
          {fields.map((field, i) => (
            <li key={field.id}>
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
        />
        <div>
          <MuiButton
            variant="contained"
            color="primary"
            label="Add"
            type="submit"
          />
        </div>
      </form>
      <PostPreview content={markdown} />
    </div>
  )
}

export default NewPost
