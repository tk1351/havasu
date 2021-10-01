export type LoginInputs = {
  email: string
  password: string
}

export type PostInputs = {
  title: string
  content: string
  tags: { name: string }[]
}

export type InputType =
  | 'number'
  | 'button'
  | 'time'
  | 'image'
  | 'text'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'month'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | undefined
