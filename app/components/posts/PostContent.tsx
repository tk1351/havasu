import React, { FC } from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeBlock from '../form/CodeBlock'

type PostContentProps = {
  content: string
}

const PostContent: FC<PostContentProps> = ({ content }) => {
  return (
    <ReactMarkDown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{ code: CodeBlock }}
    />
  )
}

export default PostContent
