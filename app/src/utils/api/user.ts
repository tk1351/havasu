import { api } from './api'
import { CurrentUser } from '../../types/user'

export const fetchCurrentUser = async () => {
  return await api.get<CurrentUser>('/auth')
}
