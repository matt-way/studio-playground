
export const init = state => {
  state.chars = [
    "0","1","2","3","4","5","6","7","8","9",
    "e",".",
    "*","+","-","/","%",
    "!","^","&","|","[","]","~","{","}"
	];	
  state.clen = state.chars.length
  state.size = state.clen**5
  state.iters = [0,0,0,0,0]  
  state.mainIter = 0
}

export const run = (state) => {
  const { chars, clen, iters } = state
  const expr = 
    chars[iters[4]] +
    chars[iters[3]] +
    chars[iters[2]] +
    chars[iters[1]] +
    chars[iters[0]]
      
  try {
    if (f(eval(expr))){
      console.log(expr);
    }
  } catch (e) {};
  
  for(var i=0;i<5;i++){
    iters[i]++
    if(iters[i] >= clen){
      iters[i] = 0
    }else{
      break
    }
  }
  
  state.mainIter++
  state.curExpr = expr
  state.hello = 5
}
