import fs from 'fs'
import es from 'event-stream'

export const run = async state => {
  
  state.data = []
  state.lines = 0
  
  return new Promise(resolve => {
    const stream = fs.createReadStream('/home/matt/Downloads/pc.csv')
    	.pipe(es.split())
    	.pipe(es.map((line, cb) => {           
        if(line.startsWith('#')){
          console.log(line)
        }else{
          const vals = line.split(',')
         	if(vals.length === 6){
          	state.data.push(vals.map((v, i) => {
          	  return i < 3 ? parseFloat(v) : parseInt(v)
          	}))
          	state.lines++
          }
        }
        if(state.lines % 100000 === 0){
          console.log(state.lines)
        }        
        cb(null, line)
      })
      .on('error', function(err){
        console.log('Error while reading file.', err)
        resolve()
    	})
    	.on('end', function(){        
        console.log('Read entire file.', state.lines)
        resolve()
    	})
    )
  })  
}
