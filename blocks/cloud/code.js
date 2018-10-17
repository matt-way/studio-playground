import * as THREE from 'three'

export const run = (state, { domRoot }) => {
	
  const { processedData, lines } = state
  
  const width = domRoot.clientWidth
  const height = 500      
  const fieldOfView = 75
  const aspectRatio = width / height
  const nearPlane = 1
  const farPlane = 3000  
  const cameraZ = 90
  const fogHex = 0x00
  const fogDensity = 0.0007

  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
  camera.position.z = cameraZ

  const scene = new THREE.Scene()
  //scene.fog = new THREE.FogExp2(fogHex, fogDensity)

  const geometry = new THREE.Geometry()

  const particleCount = lines
  for (var i = 0; i < particleCount; i++) {
    const line = processedData[i]
    const vertex = new THREE.Vector3()
    vertex.x = line[0]
    vertex.y = line[1] 
    vertex.z = line[2]
    geometry.vertices.push(vertex)
    
    const colour = new THREE.Color(
      line[3],
      line[4],
      line[5]
    )
    geometry.colors.push(colour)
  }
    
  const mat = new THREE.PointsMaterial({ 
    size: 1, 
    vertexColors: THREE.VertexColors 
  })
  const particles = new THREE.Points(geometry, mat)
  scene.add(particles)  
  
  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  domRoot.appendChild(renderer.domElement)
  
  Object.assign(state, { camera, scene, renderer, cameraZ, particles }) 
  
  renderer.domElement.addEventListener('wheel', e => {
    state.cameraZ += e.deltaY * 0.1    
  }) 
}

export const update = state => {
  const { camera, scene, materials, renderer, parameters, cameraZ, particles } = state
  const mouseX = 0
  const mouseY = 0
  
  var time = Date.now() * 0.00005

  camera.position.x = 0//+= (mouseX - camera.position.x) * 0.05
  camera.position.y = 0//+= (-mouseY - camera.position.y) * 0.05
  camera.position.z = cameraZ
  camera.lookAt(scene.position)

  particles.rotation.x = -1.52
  //particles.rotation.x -= 0.001
  particles.rotation.y += 0
  particles.rotation.z += 0
  
  renderer.render(scene, camera)
}
