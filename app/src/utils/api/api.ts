import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

export const offset = 0
export const limit = 10
export const authorId = process.env.AUTHOR_ID
