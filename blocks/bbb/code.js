export const init = state => {
  // This code is run once at the start of a run mode
}

export const run = (state, { io, domRoot }) => {
  // This code is runfor every run cycle
  domRoot.innerHTML = `${state.whatever} - ${io.someStatic} - ${io.someLink}`
}
