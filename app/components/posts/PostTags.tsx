import React, { FC } from 'react'
import Link from 'next/link'
import { Stack } from '@mui/material'
import { ITag } from '../../src/types/post'
import MuiChip from '../mui/MuiChip'

type PostTagsProps = {
  tags: ITag[]
}

const PostTags: FC<PostTagsProps> = ({ tags }) => {
  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Link href="/" key={tag.id}>
          <MuiChip label={tag.name} />
        </Link>
      ))}
    </Stack>
  )
}

export default PostTags
