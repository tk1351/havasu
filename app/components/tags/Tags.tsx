import React, { FC } from 'react'
import Link from 'next/link'
import { Stack, Grid } from '@mui/material'
import { CountTag } from '../../src/types/tag'
import MuiChip from '../mui/MuiChip'

type TagsProps = {
  tags: CountTag[]
}

const Tags: FC<TagsProps> = ({ tags }) => {
  return (
    <Grid item xs={4}>
      <p>Tags</p>
      <Stack spacing={1}>
        {tags.map((tag, i) => (
          <Link
            href={{ pathname: '/tags', query: { tag: tag.tags_name } }}
            key={i}
          >
            <a>
              <MuiChip label={tag.tags_name} />
            </a>
          </Link>
        ))}
      </Stack>
    </Grid>
  )
}

export default Tags
