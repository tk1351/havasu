import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

type UseUtcToZonedTimeReturnType = {
  formatDate: string
}

export const useUtcToZonedTime = (date: Date): UseUtcToZonedTimeReturnType => {
  const utcDate = new Date(date)
  const jsDate = utcToZonedTime(utcDate, 'Asia/Tokyo')

  const formatDate = format(jsDate, 'yyyy-MM-dd')

  return { formatDate }
}
