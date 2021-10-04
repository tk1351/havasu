import { MarkDown } from '../types/markdown'

export const markdownElement: MarkDown = {
  mainRow: 'やりたいこと',
  subRows: ['方法'],
  bodies: [
    { main: 'h1', sub: '# 見出し' },
    { main: 'h2', sub: '## 見出し' },
    { main: 'h3', sub: '### 見出し' },
    { main: 'h4', sub: '#### 見出し' },
    { main: 'h5', sub: '##### 見出し' },
    { main: 'h6', sub: '###### 見出し' },
    { main: '段落', sub: '(空白行)' },
    { main: '改行', sub: '(スペース2つ)' },
  ],
}
