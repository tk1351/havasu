import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

type UseUtcToZonedTimeReturnType = {
  formatDate: string
}

export const useUtcToZonedTime = (
  createdAt: Date
): UseUtcToZonedTimeReturnType => {
  const date = new Date(createdAt)
  const jsDate = utcToZonedTime(date, 'Asia/Tokyo')
  const formatDate = format(jsDate, 'yyyy-MM-dd')

  return { formatDate }
}
