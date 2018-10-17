import fs from 'fs'
import es from 'event-stream'

export const init = async state => {
  
  state.data = []
  state.lines = 0
  
  return new Promise(resolve => {
    const stream = fs.createReadStream('/home/matt/Downloads/pc.csv')
    	.pipe(es.split())
    	.pipe(es.map((line, cb) => {
        state.lines++        
        if(line.startsWith('#')){
          console.log(line)
        }else{
        	state.data.push(line.split(',').map((v, i) => {
            return i < 3 ? parseFloat(v) : parseInt(v)
          }))
        }
        if(state.lines % 100000 === 0){
          console.log(state.lines)
        }
        cb(null, line)
      })
      .on('error', function(err){
        console.log('Error while reading file.', err);
    	})
    	.on('end', function(){        
        console.log('Read entire file.')
        resolve()
    	})
    )
  })  
}

export const run = state => {
  // This code is runfor every run cycle
  //console.log(state.data)
  console.log(state.data[0], state.data.length)
}
