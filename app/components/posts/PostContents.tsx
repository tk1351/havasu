import React, { FC } from 'react'
import { IContent } from '../../src/types/post'

type PostContentsProps = {
  contents: IContent[]
}

const PostContents: FC<PostContentsProps> = ({ contents }) => {
  return (
    <>
      {contents.map((content) => (
        <li key={content.id}>
          <h4>
            {content.category}: {content.text}
          </h4>
        </li>
      ))}
    </>
  )
}

export default PostContents
