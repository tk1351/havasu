import React, { FC } from 'react'
import ReactMarkDown from 'react-markdown'

type PostPreviewProps = {
  content: string
}

const PostPreview: FC<PostPreviewProps> = ({ content }) => {
  return (
    <div>
      <h3>Preview</h3>
      <ReactMarkDown>{content}</ReactMarkDown>
    </div>
  )
}

export default PostPreview
