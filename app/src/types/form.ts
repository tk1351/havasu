export type LoginInputs = {
  email: string
  password: string
}

export type PostInputs = {
  title: string
  contents: ContentInputs[]
  tags: TagInputs[]
}

export type ContentInputs = {
  category: number
  text: string
}

export type TagInputs = {
  name: string
}

export type InputType =
  | 'number'
  | 'button'
  | 'time'
  | 'image'
  | 'text'
  | 'hidden'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'search'
  | (string & {})
  | 'tel'
  | 'url'
  | 'email'
  | 'date'
  | 'datetime-local'
  | 'file'
  | undefined
