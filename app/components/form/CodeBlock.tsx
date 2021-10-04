import React from 'react'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import YouTube from 'react-youtube'

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = /language-(\w+)/.exec(className || '')
  const lang = match && match[1] ? match[1] : ''

  if (lang === 'youtube') {
    // youtubeのurl末尾の空白文字を削除
    const url = String(children[0]).trimEnd()
    // videoのidのみをurlから抽出
    const vid = url.substr(url.indexOf('=') + 1)
    return <YouTube videoId={vid} />
  }

  return (
    <SyntaxHighlighter
      style={dark}
      language={lang}
      children={String(children).replace(/\n$/, '')}
    />
  )
}

export default CodeBlock
