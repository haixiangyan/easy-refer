import dayjs from 'dayjs'

export const dateLeft = (date: Date | string) => {
  const deadline = dayjs(date)
  const now = dayjs()

  const yearLeft = deadline.diff(now, 'year')
  if (yearLeft) return `还剩${yearLeft}年`

  const monthLeft = deadline.diff(now, 'month')
  if (monthLeft) return `还剩${monthLeft}月`

  const weekLeft = deadline.diff(now, 'week')
  if (weekLeft) return `还剩${weekLeft}周`

  const dayLeft = deadline.diff(now, 'day')
  if (dayLeft) return `还剩${dayLeft}天`

  return `还剩0天`
}
