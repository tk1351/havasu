import React, { FC } from 'react'
import Link from 'next/link'
import { Stack, Chip } from '@mui/material'
import { ITag } from '../../src/types/post'

type PostTagsProps = {
  tags: ITag[]
}

const PostTags: FC<PostTagsProps> = ({ tags }) => {
  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Link href="/">
          <Chip key={tag.id} label={tag.name} component="a" clickable />
        </Link>
      ))}
    </Stack>
  )
}

export default PostTags
