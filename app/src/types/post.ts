import { DefaultType } from './default'

export interface IPost extends DefaultType {
  title: string
  content: string
  tags: ITag[]
}

export interface ITag extends DefaultType {
  name: string
}

export type Query = {
  query: string
}
