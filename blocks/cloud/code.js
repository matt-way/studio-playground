import * as THREE from 'three'

export const init = (state, { domRoot }) => {
	
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

  const particleCount = 10000000
  for (var i = 0; i < particleCount; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2000 - 1000
    vertex.y = Math.random() * 2000 - 1000
    vertex.z = Math.random() * 2000 - 1000
    geometry.vertices.push(vertex)
  }

  const parameters = [
    [[1, 1, 0.5], 5],
    [[0.95, 1, 0.5], 4],
    [[0.90, 1, 0.5], 3],
    [[0.85, 1, 0.5], 2],
    [[0.80, 1, 0.5], 1]
  ]
  const parameterCount = parameters.length

  const materials = []
  for (var i = 0; i < parameterCount; i++) {
    const color = parameters[i][0]
    const size = parameters[i][1]
    const mat = new THREE.PointsMaterial({ size })
    materials.push(mat)
    const particles = new THREE.Points(geometry, mat)
    particles.rotation.x = Math.random() * 6
    particles.rotation.y = Math.random() * 6
    particles.rotation.z = Math.random() * 6
    scene.add(particles)
  }
  
  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  domRoot.appendChild(renderer.domElement)
  
  Object.assign(state, { camera, scene, materials, renderer, parameters }) 
}

export const run = state => {
  const { camera, scene, materials, renderer, parameters } = state
  const mouseX = 50
  const mouseY = 100
  
  var time = Date.now() * 0.00005

  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05  
  camera.lookAt(scene.position)

  for (var i=0; i<scene.children.length; i++) {
    const object = scene.children[i]
    if (object instanceof THREE.Points) {
      object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
    }
  }
  for (var i = 0; i < materials.length; i++) {
    const color = parameters[i][0]
    const h = (360 * (color[0] + time) % 360) / 360
    materials[i].color.setHSL(h, color[1], color[2])
  }
  renderer.render(scene, camera)
}
