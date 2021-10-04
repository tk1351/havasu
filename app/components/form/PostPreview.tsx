import React, { FC } from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeBlock from './CodeBlock'

type PostPreviewProps = {
  content: string
}

const PostPreview: FC<PostPreviewProps> = ({ content }) => {
  return (
    <div>
      <h3>Preview</h3>
      <ReactMarkDown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{ code: CodeBlock }}
      />
    </div>
  )
}

export default PostPreview
