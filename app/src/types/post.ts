export interface IPost extends DefaultType {
  title: string
  liked: number
  contents: IContent[]
  tags: ITag[]
}

export interface IContent extends DefaultType {
  category: number
  text: string
}

export interface ITag extends DefaultType {
  name: string
}

type DefaultType = {
  id: number
  createdAt: Date
  updatedAt: Date
}
