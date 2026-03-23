// Waiting time estimation utility
// Based on current pending/accepted orders and average prep time

export function estimateWaitTime(pendingOrders, avgPrepTimeMinutes = 25) {
  if (!pendingOrders || pendingOrders === 0) {
    return { minutes: 10, label: '~10 min', level: 'low' }
  }

  const baseTime = 10 // minimum wait
  const perOrder = avgPrepTimeMinutes / 3 // overlap factor — kitchen handles multiple orders
  const totalMinutes = Math.round(baseTime + pendingOrders * perOrder)

  let level = 'low'
  if (totalMinutes > 30) level = 'medium'
  if (totalMinutes > 50) level = 'high'

  return {
    minutes: totalMinutes,
    label: `~${totalMinutes} min`,
    level
  }
}

export function getWaitTimeColor(level) {
  switch (level) {
    case 'low': return '#2ecc71'
    case 'medium': return '#f59e0b'
    case 'high': return '#ef4444'
    default: return '#2ecc71'
  }
}
