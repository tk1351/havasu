import { PostInputs } from '../types/input'
import api, { authorId, offset, limit } from './api'
import { IPost } from '../types/post'

export const registerPost = async (data: PostInputs) => {
  return await api.post<boolean>('/posts/create', data)
}

export const fetchPosts = async (tag: string) => {
  const url = `/posts/${authorId}?offset=${offset}&limit=${limit}&tag=${encodeURI(
    tag
  )}`
  return await api.get<[IPost[], number]>(url)
}
