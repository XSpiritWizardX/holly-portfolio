import { useState, useEffect, useRef } from 'react'
import './ThreeJsGame.css'

const ThreeJsGame = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
  })

  // Spaceship movement function
  const updateSpaceship = (deltaTime) => {
    const spaceship = sceneRef.current?.spaceship
    if (!spaceship) return

    const keys = keysRef.current
    const moveSpeed = 15

    // Get spaceship's current rotation
    const THREE = window.THREE
    const forward = new THREE.Vector3(0, 0, 1)
    const right = new THREE.Vector3(1, 0, 0)
    const up = new THREE.Vector3(0, 1, 0)

    // Apply spaceship's rotation to direction vectors
    forward.applyQuaternion(spaceship.quaternion)
    right.applyQuaternion(spaceship.quaternion)
    up.applyQuaternion(spaceship.quaternion)

    // Movement
    if (keys.forward) {
      spaceship.position.addScaledVector(forward, moveSpeed * deltaTime)
    }
    if (keys.backward) {
      spaceship.position.addScaledVector(forward, -moveSpeed * deltaTime * 0.5)
    }
    if (keys.left) {
      spaceship.position.addScaledVector(right, -moveSpeed * deltaTime * 0.7)
    }
    if (keys.right) {
      spaceship.position.addScaledVector(right, moveSpeed * deltaTime * 0.7)
    }
    if (keys.up) {
      spaceship.position.addScaledVector(up, moveSpeed * deltaTime * 0.7)
    }
    if (keys.down) {
      spaceship.position.addScaledVector(up, -moveSpeed * deltaTime * 0.7)
    }

    // Banking effect when turning
    let bankAngle = 0
    if (keys.left) bankAngle = Math.PI / 6
    if (keys.right) bankAngle = -Math.PI / 6

    spaceship.rotation.z += (bankAngle - spaceship.rotation.z) * 0.1
  }

  // Camera follow function
  const updateCamera = () => {
    const spaceship = sceneRef.current?.spaceship
    const camera = sceneRef.current?.camera
    if (!spaceship || !camera) return

    const THREE = window.THREE

    // Mouse look sensitivity
    const mouseSensitivity = 0.02
    const mouseX = mouseRef.current.x * mouseSensitivity
    const mouseY = mouseRef.current.y * mouseSensitivity

    // Apply mouse rotation to spaceship
    spaceship.rotation.y -= mouseX * 0.5
    spaceship.rotation.x -= mouseY * 0.5

    // Clamp vertical rotation
    spaceship.rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, spaceship.rotation.x))

    // Camera follows behind spaceship
    const cameraDistance = 8
    const cameraHeight = 2

    const offset = new THREE.Vector3(0, cameraHeight, -cameraDistance)
    offset.applyQuaternion(spaceship.quaternion)

    const targetPosition = spaceship.position.clone().add(offset)

    // Smooth camera movement
    camera.position.lerp(targetPosition, 0.1)

    // Look at spaceship with slight forward offset
    const lookTarget = spaceship.position.clone()
    const forwardOffset = new THREE.Vector3(0, 0, 2)
    forwardOffset.applyQuaternion(spaceship.quaternion)
    lookTarget.add(forwardOffset)

    camera.lookAt(lookTarget)
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE'].includes(event.code)) {
        event.preventDefault()
      }

      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = true
          break
        case 'KeyQ':
          keysRef.current.up = true
          break
        case 'KeyE':
          keysRef.current.down = true
          break
      }
    }

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = false
          break
        case 'KeyQ':
          keysRef.current.up = false
          break
        case 'KeyE':
          keysRef.current.down = false
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    const initThreeJS = async () => {
      try {
        if (!canvasRef.current) {
          console.log('Canvas ref not ready, retrying...')
          setTimeout(initThreeJS, 100)
          return
        }

        const THREE = await import('three')
        window.THREE = THREE // Store THREE globally for functions

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0a0a0a)

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.set(0, 0, 5)

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)

        if (canvasRef.current) {
          canvasRef.current.appendChild(renderer.domElement)
        } else {
          console.error('Canvas ref is null when trying to append renderer')
          return
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        const pointLight = new THREE.PointLight(0x00ff88, 1, 100)
        pointLight.position.set(0, 0, 10)
        scene.add(pointLight)


// Remove or comment out the old point light
// const pointLight = new THREE.PointLight(0x00ff88, 1, 100)
// pointLight.position.set(0, 0, 10)
// scene.add(pointLight)

// Create the Sun (main light source)
const sunGeometry = new THREE.SphereGeometry(8, 32, 32)
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xffaa00,
  transparent: true,
  opacity: 0.9
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.position.set(100, 50, -200)

// Add sun glow effect
const sunGlowGeometry = new THREE.SphereGeometry(12, 32, 32)
const sunGlowMaterial = new THREE.MeshBasicMaterial({
  color: 0xff6600,
  transparent: true,
  opacity: 0.3
})
const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial)
sunGlow.position.copy(sun.position)
scene.add(sun)
scene.add(sunGlow)

// Sun as main light source
const sunLight = new THREE.PointLight(0xffaa44, 2, 500)
sunLight.position.copy(sun.position)
scene.add(sunLight)

// Create Planets
const planets = []

// Planet 1 - Rocky planet
const planet1Geometry = new THREE.SphereGeometry(3, 32, 32)
const planet1Material = new THREE.MeshPhongMaterial({
  color: 0x8B4513,
  shininess: 30
})
const planet1 = new THREE.Mesh(planet1Geometry, planet1Material)
planet1.position.set(-50, 20, -80)
planets.push(planet1)
scene.add(planet1)

// Planet 2 - Blue water planet
const planet2Geometry = new THREE.SphereGeometry(4, 32, 32)
const planet2Material = new THREE.MeshPhongMaterial({
  color: 0x4169E1,
  shininess: 100
})
const planet2 = new THREE.Mesh(planet2Geometry, planet2Material)
planet2.position.set(80, -30, -120)
planets.push(planet2)
scene.add(planet2)

// Planet 3 - Gas giant
const planet3Geometry = new THREE.SphereGeometry(6, 32, 32)
const planet3Material = new THREE.MeshPhongMaterial({
  color: 0xFF6347,
  shininess: 50
})
const planet3 = new THREE.Mesh(planet3Geometry, planet3Material)
planet3.position.set(-120, -40, -150)
planets.push(planet3)
scene.add(planet3)

// Planet 4 - Ice planet
const planet4Geometry = new THREE.SphereGeometry(2.5, 32, 32)
const planet4Material = new THREE.MeshPhongMaterial({
  color: 0xE0FFFF,
  shininess: 200
})
const planet4 = new THREE.Mesh(planet4Geometry, planet4Material)
planet4.position.set(60, 80, -90)
planets.push(planet4)
scene.add(planet4)

// Add rings to gas giant
const ringGeometry = new THREE.RingGeometry(7, 9, 32)
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFD700,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.6
})
const ring = new THREE.Mesh(ringGeometry, ringMaterial)
ring.position.copy(planet3.position)
ring.rotation.x = Math.PI / 2
scene.add(ring)


        // Create spaceship
        const spaceshipGroup = new THREE.Group()

        // Main body (elongated diamond shape)
        const bodyGeometry = new THREE.ConeGeometry(0.3, 2, 6)
        const bodyMaterial = new THREE.MeshPhongMaterial({
          color: 0x888888,
          shininess: 100
        })
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        body.rotation.x = Math.PI / 2
        spaceshipGroup.add(body)

        // Wings
        const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.3)
        const wingMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 })
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial)
        leftWing.position.set(0, 0, -0.3)
        spaceshipGroup.add(leftWing)

        // Engine glow
        const engineGeometry = new THREE.SphereGeometry(0.15, 8, 8)
        const engineMaterial = new THREE.MeshBasicMaterial({
          color: 0x00aaff,
          transparent: true,
          opacity: 0.8
        })
        const engine = new THREE.Mesh(engineGeometry, engineMaterial)
        engine.position.set(0, 0, -1)
        spaceshipGroup.add(engine)

        // Position spaceship
        spaceshipGroup.position.set(0, 0, 0)
        spaceshipGroup.userData = {
          velocity: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Euler(0, 0, 0)
        }
        scene.add(spaceshipGroup)

        // Create the spinning cube (now as a distant object)
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const material = new THREE.MeshPhongMaterial({
          color: 0x00ff88,
          shininess: 100,
          transparent: true,
          opacity: 0.8
        })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(10, 5, -10) // Move it away from spawn
        scene.add(cube)

        // Create background stars
        const backgroundObjects = []
        for (let i = 0; i < 200; i++) {
          const bgGeometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.1, 8, 8)
          const bgMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5 + Math.random() * 0.5),
            transparent: true,
            opacity: 0.6 + Math.random() * 0.4
          })
          const star = new THREE.Mesh(bgGeometry, bgMaterial)

          // Spread stars in a larger area
          star.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100 - 20
          )

          star.userData = {
            originalX: star.position.x,
            originalY: star.position.y,
            originalZ: star.position.z,
            speed: Math.random() * 0.02 + 0.01,
            twinkle: Math.random() * Math.PI * 2
          }

          backgroundObjects.push(star)
          scene.add(star)
        }

        // Store references
        sceneRef.current = {
        scene,
        camera,
        renderer,
        spaceship: spaceshipGroup,
        cube,
        backgroundObjects,
        sun,
        sunGlow,
        sunLight,
        planets
        }


        setIsLoaded(true)
        console.log('Three.js initialized successfully!')

        // Animation loop
        let animationId
        const animate = (time) => {
          const deltaTime = 0.016 // ~60fps

          // Update spaceship movement
          updateSpaceship(deltaTime)

          // Update camera to follow spaceship with mouse look
          updateCamera()

          // Rotate the distant cube
          cube.rotation.x += 0.01
          cube.rotation.y += 0.01

          // In your animate function, add this after the cube rotation:
            // Animate planets
            planets.forEach((planet, index) => {
            planet.rotation.y += 0.005 + (index * 0.002)
            })

            // Animate sun glow
            sunGlow.rotation.y += 0.01
            sunGlow.material.opacity = 0.2 + Math.sin(time * 0.003) * 0.1

            // Remove or comment out the old point light animation:
            // pointLight.position.x = Math.sin(time * 0.002) * 5
            // pointLight.position.y = Math.cos(time * 0.002) * 5

          // Animate background stars
          backgroundObjects.forEach((star) => {
            // star.rotation.x += star.userData.speed
            // star.rotation.y += star.userData.speed * 0.5

            // Twinkling effect
            star.userData.twinkle += 0.05
            star.material.opacity = 0.4 + Math.sin(star.userData.twinkle) * 0.3
          })

          // Animate point light
          pointLight.position.x = Math.sin(time * 0.002) * 5
          pointLight.position.y = Math.cos(time * 0.002) * 5

          // Render
          renderer.render(scene, camera)
          animationId = requestAnimationFrame(animate)
        }

        animate(0)

        // Handle window resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize)
          if (animationId) {
            cancelAnimationFrame(animationId)
          }
          if (canvasRef.current && renderer.domElement && canvasRef.current.contains(renderer.domElement)) {
            canvasRef.current.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }

      } catch (error) {
        console.error('Failed to initialize Three.js:', error)
        setIsLoaded(false)
      }
    }

    const timer = setTimeout(initThreeJS, 100)
    return () => clearTimeout(timer)
  }, [])

  // Mouse movement handler for look controls
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

 return (
  <div className="game-container">
    {/* Loading overlay */}
    {!isLoaded && (
      <div className="loading-overlay">
        <div className="loading-text">Loading Three.js Scene...</div>
      </div>
    )}

    {/* Controls overlay */}
    {isLoaded && (
      <div className="controls-overlay">
        <div className="controls-title">🚀 Space Flight Simulator</div>
        <div className="controls-list">
          <div>WASD / Arrow Keys: Move</div>
          <div>Q/E: Up/Down</div>
          <div>Mouse: Look Around</div>
        </div>
      </div>
    )}

    {/* Crosshair */}
    {isLoaded && <div className="crosshair"></div>}

    {/* Three.js canvas container */}
    <div ref={canvasRef} className="canvas-container" />
  </div>
)

}

export default ThreeJsGame
