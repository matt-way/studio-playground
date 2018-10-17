export const init = (state) => {
  // This code is run once at the start of a run mode
  state.lastProgress = 0
}

export const run = (state, { domRoot }) => {
  // This code is runfor every run cycle
	const progress = state.mainIter / (state.size) * 100.0
  //if(progress - state.lastProgress > 0.01){
  	//state.lastProgress = progress
  	//console.log(`${progress} - ${state.mainIter}/${state.size}`)
  //}  
  domRoot.innerHTML = `${progress}<br/>${state.mainIter}/${state.size}<br/>${state.curExpr}<br/>${state.hello}`
}
