import { atom } from 'recoil'
import { IPost } from '../../src/types/post'

export const postsState = atom<IPost[]>({
  key: 'postsState',
  default: [],
})
