import React, { FC } from 'react'
import { ITag } from '../../src/types/post'

type PostTagsProps = {
  tags: ITag[]
}

const PostTags: FC<PostTagsProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <p key={tag.id}>{tag.name}</p>
      ))}
    </>
  )
}

export default PostTags
