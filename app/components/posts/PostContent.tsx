import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

type PostContentProps = {
  content: string
}

const PostContent: FC<PostContentProps> = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>
}

export default PostContent
