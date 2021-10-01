import { PostInputs } from '../types/input'
import api from './api'

export const registerPost = async (data: PostInputs) => {
  return await api.post<boolean>('/posts/create', data)
}
