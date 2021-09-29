import React, { FC } from 'react'
import { useRouter } from 'next/router'
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { Button } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { PostInputs } from '../../src/types/form'
import MuiTextField from '../mui/MuiTextField'
import MuiButton from '../mui/MuiButton'
import MuiSelect from '../mui/MuiSelect'
import { api } from '../../src/utils/api/api'
import { alertState } from '../../src/recoil/atoms/alert'
import { newPostValidationSchema } from '../../src/utils/newPostValidation'

type NewPostProps = {}

const defaultValues: PostInputs = {
  title: '',
  contents: [{ category: 1, text: '' }],
  tags: [{ name: '' }],
}

const NewPost: FC<NewPostProps> = () => {
  const router = useRouter()

  const { control, handleSubmit } = useForm<PostInputs>({
    defaultValues,
    // FIXME: resolverで謎の型エラー
    resolver: yupResolver(newPostValidationSchema) as any,
  })

  const {
    fields: contentFields,
    append: contentAppend,
    remove: contentRemove,
  } = useFieldArray({ control, name: 'contents' })

  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({ control, name: 'tags' })

  const setAlert = useSetRecoilState(alertState)

  const openAlert = (msg: string, alertType: 'succeeded' | 'failed') => {
    setAlert({ msg, alertType, open: true })
  }

  const registerNewPost = async (data: PostInputs) => {
    try {
      await api.post<boolean>('/posts/create', data)
      openAlert('記事の投稿が完了しました', 'succeeded')
    } catch (e) {
      const msg: string = e.response.data.message
      openAlert(msg, 'failed')
    }
  }

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    await registerNewPost(data)
    await router.push('/')
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          render={({ field, formState: { errors } }) => (
            <MuiTextField
              field={field}
              formState={errors}
              variant="outlined"
              label="title"
              type="text"
              helperText={errors.title && errors.title.message}
              error={Boolean(errors.title)}
            />
          )}
        />
        <div>
          <ul>
            {contentFields.map((field, i) => (
              <li key={field.id}>
                <div>
                  <Controller
                    control={control}
                    name={`contents.${i}.category`}
                    render={({
                      field: { onChange, value },
                      formState: { errors },
                    }) => (
                      <MuiSelect
                        inputLabel="カテゴリー"
                        label="カテゴリー"
                        name={`contents.${i}.category`}
                        onChange={onChange}
                        value={value}
                        menuItems={['見出し', '本文', 'URL']}
                        error={Boolean(errors.contents && errors.contents[i])}
                        helperText={
                          errors.contents &&
                          errors.contents[i]?.category?.message
                        }
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`contents.${i}.text`}
                    render={({ field, formState: { errors } }) => (
                      <MuiTextField
                        field={field}
                        formState={errors}
                        variant="outlined"
                        label="text"
                        type="text"
                        helperText={
                          errors.contents && errors.contents[i]?.text?.message
                        }
                        error={Boolean(errors.contents && errors.contents[i])}
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={() => contentRemove(i)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => contentAppend({ category: 1, text: '' })}
          >
            Append
          </Button>
        </div>
        <ul>
          {tagFields.map((field, i) => (
            <li key={field.id}>
              <div>
                <Controller
                  control={control}
                  name={`tags.${i}.name`}
                  render={({ field, formState: { errors } }) => (
                    <MuiTextField
                      field={field}
                      formState={errors}
                      variant="outlined"
                      label="name"
                      type="text"
                      helperText={errors.tags && errors.tags[i]?.name?.message}
                      error={Boolean(errors.tags && errors.tags[i])}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => tagRemove(i)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => tagAppend({ name: '' })}
        >
          Append
        </Button>
        <div>
          <MuiButton
            type="submit"
            variant="contained"
            color="primary"
            label="Add"
          />
        </div>
      </form>
    </div>
  )
}

export default NewPost
