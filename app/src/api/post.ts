import { PostInputs } from '../types/input'
import api, { authorId, offset, limit } from './api'
import { IPost } from '../types/post'

export const registerPost = async (data: PostInputs) => {
  return await api.post<boolean>('/posts/create', data)
}

// pagination時に使うため
export const fetchPosts = async (page: number) => {
  const pageOffset = (page - 1) * 10
  const url = `/posts/${authorId}?offset=${pageOffset}&limit=${limit}`
  return await api.get<[IPost[], number]>(url)
}

export const fetchPostsByTag = async (tag: string) => {
  const url = `/posts/${authorId}?offset=${offset}&limit=${limit}&tag=${encodeURI(
    tag
  )}`
  return await api.get<[IPost[], number]>(url)
}

export const fetchSearchResult = async (query: string) => {
  const url = `/posts/${authorId}?offset=${offset}&limit=${limit}&query=${encodeURI(
    query
  )}`
  return await api.get<[IPost[], number]>(url)
}
