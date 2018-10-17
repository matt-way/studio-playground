export const init = state => {
  const { data, lines } = state
  const totals = [0,0,0]
  data.forEach(point => {
    totals[0] += point[0]
    totals[1] += point[1]
    totals[2] += point[2]
  })
  
  const avgs = totals.map(t => t / lines)
  
  data.forEach(point => {
    point[0] -= avgs[0]
    point[1] -= avgs[1]
    point[2] -= avgs[2]
  })
}

export const run = state => {
  // This code is runfor every run cycle
}
