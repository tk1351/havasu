import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import { IPost } from '../../src/types/post'
import PostDetail from '../posts/PostDetail'
import { CountTag } from '../../src/types/tag'
import Tags from '../tags/Tags'
import MuiButton from '../mui/MuiButton'
import { alertState } from '../../recoil/atoms/alert'
import { deletePost } from '../../src/api/post'

type AdminDeletePostProps = {
  post: IPost
  tagColumn: CountTag[]
}

const AdminDeletePost: FC<AdminDeletePostProps> = ({ post, tagColumn }) => {
  const router = useRouter()

  const { id, title } = post

  const setAlert = useSetRecoilState(alertState)

  const openAlert = (msg: string, alertType: 'succeeded' | 'failed') => {
    setAlert({ msg, alertType, open: true })
  }

  const onClick = async () => {
    const successMessage = '記事を削除しました'
    try {
      await deletePost(id)
      openAlert(successMessage, 'succeeded')
      await router.push('/')
    } catch (e) {
      openAlert(e.response.data.message, 'failed')
    }
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h6" component="h2">
            {title}を削除しますか？
          </Typography>
          <MuiButton
            variant="contained"
            color="secondary"
            label="Delete"
            onClick={onClick}
            type="button"
            fullWidth
          />
        </Grid>
        <PostDetail post={post} />
        <Tags tags={tagColumn} />
      </Grid>
    </>
  )
}

export default AdminDeletePost
