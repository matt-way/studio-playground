import * as THREE from 'three'

export const init = (state, { domRoot }) => {
	
  const { data, lines } = state
  
  const width = domRoot.clientWidth
  const height = 500      
  const fieldOfView = 75
  const aspectRatio = width / height
  const nearPlane = 1
  const farPlane = 3000  
  const cameraZ = 2000
  const fogHex = 0x00
  const fogDensity = 0.0007

  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
  camera.position.z = cameraZ

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(fogHex, fogDensity)

  const geometry = new THREE.Geometry()

  const particleCount = lines
  for (var i = 0; i < particleCount; i++) {
    const line = data[i]
    const vertex = new THREE.Vector3()
    vertex.x = line[0]
    vertex.y = line[1] 
    vertex.z = line[2]
    geometry.vertices.push(vertex)
    
    const colour = new THREE.Color(
      line[3] / 255,
      line[4] / 255,
      line[5] / 255
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
  
  Object.assign(state, { camera, scene, renderer }) 
}

export const run = state => {
  const { camera, scene, materials, renderer, parameters } = state
  const mouseX = 50
  const mouseY = 100
  
  var time = Date.now() * 0.00005

  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.position.z = 700
  camera.lookAt(scene.position)

  for (var i=0; i<scene.children.length; i++) {
    const object = scene.children[i]
    if (object instanceof THREE.Points) {
      object.rotation.x = 0
      object.rotation.y = 0
      object.rotation.z = -0.9//time * (i < 4 ? i + 1 : -(i + 1));
    }
  }  
  renderer.render(scene, camera)
}
