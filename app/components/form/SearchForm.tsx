import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Query } from '../../src/types/post'
import MuiTextField from '../mui/MuiTextField'

type SearchFormProps = {}

const defaultValues: Query = { query: '' }

const SearchForm: FC<SearchFormProps> = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<Query>({ defaultValues })

  const onSubmit: SubmitHandler<Query> = async (data) => {
    const { query } = data

    await router.push({ pathname: '/search', query: { query } })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="query"
        control={control}
        render={({ field }) => (
          <MuiTextField
            variant="outlined"
            label="Search..."
            type="text"
            field={field}
            onChange={field.onChange}
          />
        )}
      />
    </form>
  )
}

export default SearchForm
