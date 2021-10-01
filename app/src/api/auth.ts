import api from './api'
import { CurrentUser } from '../types/auth'

export const fetchCurrentUser = async () => {
  return await api.get<CurrentUser>('/auth')
}
