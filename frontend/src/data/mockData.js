export const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function buildWeeklyTrend(history = []) {
  const today = new Date()
  const days = [...Array(7)].map((_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - index))
    return {
      key: date.toISOString().slice(0, 10),
      name: chartLabels[index],
      fake: 0,
      real: 0,
      suspicious: 0,
    }
  })

  history.forEach((item) => {
    const key = new Date(item.date).toISOString().slice(0, 10)
    const day = days.find((entry) => entry.key === key)
    if (!day) return
    if (item.prediction === 'Fake') day.fake += 1
    if (item.prediction === 'Real') day.real += 1
    if (item.prediction === 'Suspicious') day.suspicious += 1
  })

  return days
}
