export const init = state => {
  // This code is run once at the start of a run mode
  state.test = 0
}

export const run = state => {
  // This code is runfor every run cycle
  state.whatever = 5
  state.test += 0.001
}
