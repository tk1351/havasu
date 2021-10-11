import { PostInputs } from '../types/input'
import api, { authorId, limit } from './api'
import { IPost } from '../types/post'

const getPageOffset = (page: number): number => {
  return (page - 1) * 10
}

export const registerPost = async (data: PostInputs) => {
  return await api.post<boolean>('/posts/create', data)
}

export const updatePost = async (data: PostInputs, id: number) => {
  return await api.patch<boolean>(`/posts/update/${id}`, data)
}

export const deletePost = async (id: number) => {
  return await api.delete<boolean>(`/posts/delete/${id}`)
}

// pagination時に使うため
export const fetchPosts = async (page: number) => {
  const pageOffset = getPageOffset(page)
  const url = `/posts/${authorId}?offset=${pageOffset}&limit=${limit}`
  return await api.get<[IPost[], number]>(url)
}

export const fetchPostsByTag = async (tag: string, page: number) => {
  const pageOffset = getPageOffset(page)
  const url = `/posts/${authorId}?offset=${pageOffset}&limit=${limit}&tag=${encodeURI(
    tag
  )}`
  return await api.get<[IPost[], number]>(url)
}

export const fetchSearchResult = async (query: string, page: number) => {
  const pageOffset = getPageOffset(page)
  const url = `/posts/${authorId}?offset=${pageOffset}&limit=${limit}&query=${encodeURI(
    query
  )}`
  return await api.get<[IPost[], number]>(url)
}
