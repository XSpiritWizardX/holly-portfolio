import { useState, useEffect, useRef, useCallback } from 'react'
import './Platformer.css'

const Platformer = () => {
  const canvasRef = useRef(null)
  const [editMode, setEditMode] = useState(false)
  const [selectedTool, setSelectedTool] = useState('platform')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const gameStateRef = useRef({
    player: {
      x: 100,
      y: 300,
      width: 30,
      height: 40,
      velocityX: 0,
      velocityY: 0,
      speed: 5,
      jumpPower: 15,
      onGround: false,
      isSliding: false,
      direction: 1,
      health: 100,
      lives: 3
    },
    camera: {
      x: 0,
      y: 0
    },
    world: {
      width: 8000, // Even bigger world for distance challenge
      height: 1200
    },
    bullets: [],
    platforms: [],
    decorations: [],
    enemies: [],
    powerUps: [],
    coins: [],
    gravity: 0.8,
    keys: {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    },
    score: 0,
    coinsCollected: 0,
    furthestDistance: 0,
    bestDistance: parseInt(localStorage.getItem('platformer-best-distance') || '0')
  })

  // Level editor functions
  const saveLevel = () => {
    const levelData = {
      platforms: gameStateRef.current.platforms,
      enemies: gameStateRef.current.enemies,
      powerUps: gameStateRef.current.powerUps,
      coins: gameStateRef.current.coins,
      decorations: gameStateRef.current.decorations
    }
    localStorage.setItem('platformer-level', JSON.stringify(levelData))
    alert('Level saved!')
  }

  const loadLevel = () => {
    const savedLevel = localStorage.getItem('platformer-level')
    if (savedLevel) {
      const levelData = JSON.parse(savedLevel)
      gameStateRef.current.platforms = levelData.platforms || []
      gameStateRef.current.enemies = levelData.enemies || []
      gameStateRef.current.powerUps = levelData.powerUps || []
      gameStateRef.current.coins = levelData.coins || []
      gameStateRef.current.decorations = levelData.decorations || []
      alert('Level loaded!')
    }
  }

  const clearLevel = () => {
    if (confirm('Are you sure you want to clear the level?')) {
      gameStateRef.current.platforms = []
      gameStateRef.current.enemies = []
      gameStateRef.current.powerUps = []
      gameStateRef.current.coins = []
      gameStateRef.current.decorations = []
    }
  }

  const resetPlayer = () => {
    const player = gameStateRef.current.player
    player.x = 100
    player.y = 300
    player.velocityX = 0
    player.velocityY = 0
    player.lives--

    if (player.lives <= 0) {
      // Game over - reset everything
      player.lives = 3
      player.health = 100
      player.speed = 5
      player.jumpPower = 15
      gameStateRef.current.score = 0
      gameStateRef.current.coinsCollected = 0
      gameStateRef.current.furthestDistance = 0

      // Reset all power-ups and coins
      gameStateRef.current.powerUps.forEach(p => p.collected = false)
      gameStateRef.current.coins.forEach(c => c.collected = false)
    }
  }

  // Initialize game objects with challenging platformer layout
  const initializeGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gameState = gameStateRef.current
    const world = gameState.world

    // Create a challenging endless-runner style platform layout
    gameState.platforms = [
      // Starting area - safe zone
      { x: 0, y: world.height - 50, width: 500, height: 50 },
      { x: 300, y: world.height - 200, width: 200, height: 20 },
      { x: 600, y: world.height - 150, width: 150, height: 20 },

      // Early challenges - teaching mechanics
      { x: 850, y: world.height - 100, width: 120, height: 20 },
      { x: 1100, y: world.height - 200, width: 100, height: 20 },
      { x: 1350, y: world.height - 250, width: 150, height: 20 },
      { x: 1600, y: world.height - 180, width: 120, height: 20 },

      // Medium difficulty section
      { x: 1850, y: world.height - 300, width: 100, height: 20 },
      { x: 2050, y: world.height - 220, width: 80, height: 20 },
      { x: 2250, y: world.height - 350, width: 120, height: 20 },
      { x: 2450, y: world.height - 280, width: 100, height: 20 },
      { x: 2650, y: world.height - 400, width: 150, height: 20 },

      // Hard section - precise jumps required
      { x: 2900, y: world.height - 320, width: 80, height: 20 },
      { x: 3100, y: world.height - 450, width: 60, height: 20 },
      { x: 3280, y: world.height - 380, width: 70, height: 20 },
      { x: 3450, y: world.height - 500, width: 90, height: 20 },
      { x: 3650, y: world.height - 420, width: 80, height: 20 },

      // Expert section - very challenging
      { x: 3850, y: world.height - 350, width: 60, height: 20 },
      { x: 4000, y: world.height - 480, width: 50, height: 20 },
      { x: 4150, y: world.height - 400, width: 60, height: 20 },
      { x: 4300, y: world.height - 550, width: 70, height: 20 },
      { x: 4500, y: world.height - 450, width: 80, height: 20 },

      // Master section - extreme difficulty
      { x: 4700, y: world.height - 380, width: 50, height: 20 },
      { x: 4850, y: world.height - 520, width: 40, height: 20 },
      { x: 4980, y: world.height - 420, width: 50, height: 20 },
      { x: 5130, y: world.height - 600, width: 60, height: 20 },
      { x: 5300, y: world.height - 500, width: 70, height: 20 },

      // Legendary section - for the best players
      { x: 5500, y: world.height - 450, width: 40, height: 20 },
      { x: 5650, y: world.height - 580, width: 35, height: 20 },
      { x: 5780, y: world.height - 480, width: 45, height: 20 },
      { x: 5920, y: world.height - 650, width: 50, height: 20 },
      { x: 6100, y: world.height - 550, width: 60, height: 20 },

      // Ultimate section - nearly impossible
      { x: 6300, y: world.height - 500, width: 35, height: 20 },
      { x: 6430, y: world.height - 620, width: 30, height: 20 },
      { x: 6550, y: world.height - 520, width: 40, height: 20 },
      { x: 6680, y: world.height - 700, width: 45, height: 20 },
      { x: 6850, y: world.height - 600, width: 50, height: 20 },

      // Victory area - if you make it this far!
      { x: 7100, y: world.height - 400, width: 200, height: 20 },
      { x: 7400, y: world.height - 200, width: 400, height: 200 },
    ]

    // Spread coins throughout the level for scoring
    gameState.coins = []
    for (let i = 0; i < gameState.platforms.length; i++) {
      const platform = gameState.platforms[i]
      if (i > 2) { // Skip starting platforms
        gameState.coins.push({
          x: platform.x + platform.width / 2 - 10,
          y: platform.y - 30,
          width: 20,
          height: 20,
          collected: false,
          value: Math.floor(i / 5) + 1 // Higher value coins further in the level
        })
      }
    }

    // Add some floating coin challenges
    const floatingCoins = [
      { x: 1200, y: world.height - 300, value: 5 },
      { x: 2100, y: world.height - 400, value: 10 },
      { x: 3200, y: world.height - 550, value: 15 },
      { x: 4200, y: world.height - 650, value: 25 },
      { x: 5200, y: world.height - 750, value: 50 },
      { x: 6200, y: world.height - 800, value: 100 },
    ]

    floatingCoins.forEach(coin => {
      gameState.coins.push({
        x: coin.x,
        y: coin.y,
        width: 20,
        height: 20,
        collected: false,
        value: coin.value
      })
    })

    // Decorations spread across the world
    gameState.decorations = [
      // Trees
      { x: 50, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 400, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 800, y: world.height - 170, width: 20, height: 70, type: 'tree' },
      { x: 1500, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 2500, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 3500, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 4500, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 5500, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 6500, y: world.height - 120, width: 20, height: 70, type: 'tree' },
      { x: 7200, y: world.height - 270, width: 20, height: 70, type: 'tree' },

      // Clouds
      { x: 300, y: 100, width: 80, height: 40, type: 'cloud' },
      { x: 800, y: 150, width: 100, height: 50, type: 'cloud' },
      { x: 1500, y: 80, width: 90, height: 45, type: 'cloud' },
      { x: 2200, y: 120, width: 110, height: 55, type: 'cloud' },
      { x: 3000, y: 60, width: 120, height: 60, type: 'cloud' },
      { x: 4000, y: 100, width: 100, height: 50, type: 'cloud' },
      { x: 5000, y: 80, width: 130, height: 65, type: 'cloud' },
      { x: 6000, y: 40, width: 140, height: 70, type: 'cloud' },
      { x: 7000, y: 60, width: 150, height: 75, type: 'cloud' },

      // Distance markers
      { x: 1000, y: world.height - 80, width: 40, height: 60, type: 'marker', text: '1K' },
      { x: 2000, y: world.height - 80, width: 40, height: 60, type: 'marker', text: '2K' },
      { x: 3000, y: world.height - 80, width: 40, height: 60, type: 'marker', text: '3K' },
      { x: 4000, y: world.height - 80, width: 40, height: 60, type: 'marker', text: '4K' },
      { x: 5000, y: world.height - 80, width: 40, height: 60, type: 'marker', text: '5K' },
      { x: 6000, y: world.height - 80, width: 40, height: 60, type: 'marker', text: '6K' },
      { x: 7000, y: world.height - 80, width: 40, height: 60, type: 'marker', text: '7K' },
    ]

    // Enemies get more challenging as you progress
    gameState.enemies = [
      // Easy enemies
      { x: 900, y: world.height - 130, width: 25, height: 25, velocityX: 0.3, minX: 850, maxX: 970 },
      { x: 1150, y: world.height - 230, width: 25, height: 25, velocityX: 0.2, minX: 1100, maxX: 1200 },

      // Medium enemies
      { x: 1900, y: world.height - 330, width: 25, height: 25, velocityX: 0.4, minX: 1850, maxX: 1950 },
      { x: 2300, y: world.height - 380, width: 25, height: 25, velocityX: -0.3, minX: 2250, maxX: 2370 },
      { x: 2700, y: world.height - 430, width: 25, height: 25, velocityX: 0.5, minX: 2650, maxX: 2800 },

        // Hard enemies
      { x: 3150, y: world.height - 480, width: 25, height: 25, velocityX: -0.4, minX: 3100, maxX: 3160 },
      { x: 3500, y: world.height - 530, width: 25, height: 25, velocityX: 0.6, minX: 3450, maxX: 3540 },
      { x: 3700, y: world.height - 450, width: 25, height: 25, velocityX: -0.5, minX: 3650, maxX: 3730 },

      // Expert enemies - faster and more dangerous
      { x: 4050, y: world.height - 510, width: 25, height: 25, velocityX: 0.7, minX: 4000, maxX: 4050 },
      { x: 4350, y: world.height - 580, width: 25, height: 25, velocityX: -0.6, minX: 4300, maxX: 4370 },
      { x: 4550, y: world.height - 480, width: 25, height: 25, velocityX: 0.8, minX: 4500, maxX: 4580 },

      // Master enemies - very fast
      { x: 4900, y: world.height - 550, width: 25, height: 25, velocityX: -0.9, minX: 4850, maxX: 4890 },
      { x: 5180, y: world.height - 630, width: 25, height: 25, velocityX: 1.0, minX: 5130, maxX: 5190 },
      { x: 5350, y: world.height - 530, width: 25, height: 25, velocityX: -0.8, minX: 5300, maxX: 5370 },

      // Legendary enemies - extremely fast
      { x: 5700, y: world.height - 610, width: 25, height: 25, velocityX: 1.2, minX: 5650, maxX: 5685 },
      { x: 5830, y: world.height - 510, width: 25, height: 25, velocityX: -1.1, minX: 5780, maxX: 5825 },
      { x: 6150, y: world.height - 580, width: 25, height: 25, velocityX: 1.3, minX: 6100, maxX: 6160 },

      // Ultimate enemies - insanely fast
      { x: 6480, y: world.height - 650, width: 25, height: 25, velocityX: -1.5, minX: 6430, maxX: 6460 },
      { x: 6730, y: world.height - 730, width: 25, height: 25, velocityX: 1.4, minX: 6680, maxX: 6695 },
    ]

    // Power-ups spread strategically for difficulty spikes
    gameState.powerUps = [
      // Early power-ups to help learn
      { x: 350, y: world.height - 230, width: 18, height: 18, type: 'speed', collected: false },
      { x: 650, y: world.height - 180, width: 18, height: 18, type: 'jump', collected: false },

      // Medium section power-ups
      { x: 1400, y: world.height - 280, width: 18, height: 18, type: 'health', collected: false },
      { x: 2100, y: world.height - 250, width: 18, height: 18, type: 'speed', collected: false },
      { x: 2700, y: world.height - 430, width: 18, height: 18, type: 'jump', collected: false },

      // Hard section power-ups - more valuable
      { x: 3200, y: world.height - 480, width: 18, height: 18, type: 'health', collected: false },
      { x: 3700, y: world.height - 530, width: 18, height: 18, type: 'speed', collected: false },

      // Expert section - rare but powerful
      { x: 4400, y: world.height - 610, width: 18, height: 18, type: 'jump', collected: false },
      { x: 4800, y: world.height - 580, width: 18, height: 18, type: 'health', collected: false },

      // Master section - very rare
      { x: 5400, y: world.height - 660, width: 18, height: 18, type: 'speed', collected: false },
      { x: 5900, y: world.height - 730, width: 18, height: 18, type: 'jump', collected: false },

      // Legendary section - extremely rare
      { x: 6400, y: world.height - 680, width: 18, height: 18, type: 'health', collected: false },
      { x: 6900, y: world.height - 800, width: 18, height: 18, type: 'speed', collected: false },
    ]
  }, [])

  // Mouse handling for level editor
  const handleCanvasClick = (e) => {
    if (!editMode) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const worldX = (e.clientX - rect.left) + gameStateRef.current.camera.x
    const worldY = (e.clientY - rect.top) + gameStateRef.current.camera.y

    const gameState = gameStateRef.current

    switch(selectedTool) {
      case 'platform':
        gameState.platforms.push({
          x: worldX - 50,
          y: worldY - 10,
          width: 100,
          height: 20
        })
        break
      case 'coin':
        gameState.coins.push({
          x: worldX - 10,
          y: worldY - 10,
          width: 20,
          height: 20,
          collected: false,
          value: 10
        })
        break
      case 'enemy':
        gameState.enemies.push({
          x: worldX - 12,
          y: worldY - 12,
          width: 25,
          height: 25,
          velocityX: 0.5,
          minX: worldX - 100,
          maxX: worldX + 100
        })
        break
      case 'powerup':
        const powerTypes = ['speed', 'jump', 'health']
        gameState.powerUps.push({
          x: worldX - 9,
          y: worldY - 9,
          width: 18,
          height: 18,
          type: powerTypes[Math.floor(Math.random() * powerTypes.length)],
          collected: false
        })
        break
      case 'delete':
        // Delete nearest object
        const deleteRadius = 30
        gameState.platforms = gameState.platforms.filter(p =>
          Math.abs(p.x + p.width/2 - worldX) > deleteRadius ||
          Math.abs(p.y + p.height/2 - worldY) > deleteRadius
        )
        gameState.coins = gameState.coins.filter(c =>
          Math.abs(c.x + c.width/2 - worldX) > deleteRadius ||
          Math.abs(c.y + c.height/2 - worldY) > deleteRadius
        )
        gameState.enemies = gameState.enemies.filter(e =>
          Math.abs(e.x + e.width/2 - worldX) > deleteRadius ||
          Math.abs(e.y + e.height/2 - worldY) > deleteRadius
        )
        gameState.powerUps = gameState.powerUps.filter(p =>
          Math.abs(p.x + p.width/2 - worldX) > deleteRadius ||
          Math.abs(p.y + p.height/2 - worldY) > deleteRadius
        )
        break
    }
  }

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const worldX = (e.clientX - rect.left) + gameStateRef.current.camera.x
    const worldY = (e.clientY - rect.top) + gameStateRef.current.camera.y
    setMousePos({ x: worldX, y: worldY })
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const gameState = gameStateRef.current
      switch(e.code) {
        case 'ArrowLeft':
          gameState.keys.left = true
          e.preventDefault()
          break
        case 'ArrowRight':
          gameState.keys.right = true
          e.preventDefault()
          break
        case 'ArrowUp':
          gameState.keys.up = true
          e.preventDefault()
          break
        case 'ArrowDown':
          gameState.keys.down = true
          e.preventDefault()
          break
        case 'Space':
          gameState.keys.space = true
          e.preventDefault()
          break
        case 'KeyE':
          if (!editMode) {
            setEditMode(true)
          }
          e.preventDefault()
          break
        case 'Escape':
          setEditMode(false)
          e.preventDefault()
          break
        case 'KeyR':
          if (!editMode) {
            resetPlayer()
          }
          e.preventDefault()
          break
      }
    }

    const handleKeyUp = (e) => {
      const gameState = gameStateRef.current
      switch(e.code) {
        case 'ArrowLeft':
          gameState.keys.left = false
          break
        case 'ArrowRight':
          gameState.keys.right = false
          break
        case 'ArrowUp':
          gameState.keys.up = false
          break
        case 'ArrowDown':
          gameState.keys.down = false
          gameState.player.isSliding = false
          break
        case 'Space':
          gameState.keys.space = false
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [editMode])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 600

    initializeGame()

    let animationId
    let lastShot = 0

    const gameLoop = (timestamp) => {
      const gameState = gameStateRef.current
      const player = gameState.player
      const camera = gameState.camera

      // Update furthest distance
      gameState.furthestDistance = Math.max(gameState.furthestDistance, player.x)

      // Update best distance if new record
      if (gameState.furthestDistance > gameState.bestDistance) {
        gameState.bestDistance = gameState.furthestDistance
        localStorage.setItem('platformer-best-distance', gameState.bestDistance.toString())
      }

      // Update camera to follow player
      camera.x = player.x - canvas.width / 2
      camera.y = player.y - canvas.height / 2

      // Keep camera within world bounds
      camera.x = Math.max(0, Math.min(camera.x, gameState.world.width - canvas.width))
      camera.y = Math.max(0, Math.min(camera.y, gameState.world.height - canvas.height))

      // Clear canvas with gradient background that changes with distance
      const progressRatio = player.x / gameState.world.width
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

      // Background changes color as you progress
      if (progressRatio < 0.2) {
        gradient.addColorStop(0, '#87CEEB') // Light blue
        gradient.addColorStop(1, '#98FB98') // Light green
      } else if (progressRatio < 0.4) {
        gradient.addColorStop(0, '#FFB6C1') // Light pink
        gradient.addColorStop(1, '#DDA0DD') // Plum
      } else if (progressRatio < 0.6) {
        gradient.addColorStop(0, '#F0E68C') // Khaki
        gradient.addColorStop(1, '#FFA500') // Orange
      } else if (progressRatio < 0.8) {
        gradient.addColorStop(0, '#FF6347') // Tomato
        gradient.addColorStop(1, '#DC143C') // Crimson
      } else {
        gradient.addColorStop(0, '#4B0082') // Indigo
        gradient.addColorStop(1, '#8B008B') // Dark magenta
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Save context for camera transform
      ctx.save()
      ctx.translate(-camera.x, -camera.y)

      // Update player movement (only if not in edit mode)
      if (!editMode) {
        if (gameState.keys.left) {
          player.velocityX = -player.speed
          player.direction = -1
        } else if (gameState.keys.right) {
          player.velocityX = player.speed
          player.direction = 1
        } else {
          player.velocityX *= 0.8 // Friction
        }

        // Jumping
        if (gameState.keys.up && player.onGround) {
          player.velocityY = -player.jumpPower
          player.onGround = false
        }

        // Sliding
        if (gameState.keys.down && player.onGround) {
          player.isSliding = true
          player.velocityX *= 1.5 // Slide faster
        }

        // Shooting
        if (gameState.keys.space && timestamp - lastShot > 200) {
          gameState.bullets.push({
            x: player.x + (player.direction > 0 ? player.width : 0),
            y: player.y + player.height / 2,
            velocityX: player.direction * 10,
            width: 8,
            height: 4
          })
          lastShot = timestamp
        }

        // Apply gravity
        player.velocityY += gameState.gravity

        // Update player position
        player.x += player.velocityX
        player.y += player.velocityY

        // Platform collision
        player.onGround = false
        gameState.platforms.forEach(platform => {
          if (player.x < platform.x + platform.width &&
              player.x + player.width > platform.x &&
              player.y < platform.y + platform.height &&
              player.y + player.height > platform.y) {

                   // Landing on top of platform
            if (player.velocityY > 0 && player.y < platform.y) {
              player.y = platform.y - player.height
              player.velocityY = 0
              player.onGround = true
            }
          }
        })

        // Keep player in world bounds
        if (player.x < 0) player.x = 0
        if (player.x + player.width > gameState.world.width) player.x = gameState.world.width - player.width
        if (player.y > gameState.world.height) {
          resetPlayer()
        }

        // Update bullets
        gameState.bullets = gameState.bullets.filter(bullet => {
          bullet.x += bullet.velocityX
          return bullet.x > 0 && bullet.x < gameState.world.width
        })

        // Bullet-enemy collision
        gameState.bullets.forEach((bullet, bulletIndex) => {
          gameState.enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
              // Remove bullet and enemy
              gameState.bullets.splice(bulletIndex, 1)
              gameState.enemies.splice(enemyIndex, 1)
              gameState.score += 50
            }
          })
        })
      }

      // Draw decorations first (background elements)
      gameState.decorations?.forEach(decoration => {
        switch(decoration.type) {
          case 'tree':
            // Tree trunk
            ctx.fillStyle = '#8B4513'
            ctx.fillRect(decoration.x, decoration.y, decoration.width, decoration.height)
            // Tree leaves
            ctx.fillStyle = '#228B22'
            ctx.beginPath()
            ctx.arc(decoration.x + decoration.width/2, decoration.y, 25, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'cloud':
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.beginPath()
            ctx.arc(decoration.x, decoration.y + decoration.height/2, decoration.height/2, 0, Math.PI * 2)
            ctx.arc(decoration.x + decoration.width/3, decoration.y, decoration.height/2, 0, Math.PI * 2)
            ctx.arc(decoration.x + 2*decoration.width/3, decoration.y, decoration.height/2, 0, Math.PI * 2)
            ctx.arc(decoration.x + decoration.width, decoration.y + decoration.height/2, decoration.height/2, 0, Math.PI * 2)
            ctx.fill()
            break
          case 'marker':
            // Distance markers
            ctx.fillStyle = '#FFD700'
            ctx.fillRect(decoration.x, decoration.y, decoration.width, decoration.height)
            ctx.fillStyle = '#000'
            ctx.font = 'bold 12px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(decoration.text, decoration.x + decoration.width/2, decoration.y + decoration.height/2 + 4)
            ctx.textAlign = 'left'
            break
        }
      })

      // Draw platforms with better styling
      ctx.fillStyle = '#8B4513'
      ctx.strokeStyle = '#654321'
      ctx.lineWidth = 2
      gameState.platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height)

        // Add grass on top of platforms
        ctx.fillStyle = '#228B22'
        ctx.fillRect(platform.x, platform.y - 3, platform.width, 3)
        ctx.fillStyle = '#8B4513'
      })

      // Update and draw enemies (only if not in edit mode)
      if (!editMode) {
        gameState.enemies?.forEach(enemy => {
          // Move enemy
          enemy.x += enemy.velocityX
          if (enemy.x <= enemy.minX || enemy.x + enemy.width >= enemy.maxX) {
            enemy.velocityX *= -1
          }

          // Enemy collision with player
          if (player.x < enemy.x + enemy.width &&
              player.x + player.width > enemy.x &&
              player.y < enemy.y + enemy.height &&
              player.y + player.height > enemy.y) {
            resetPlayer()
          }
        })
      }

      // Draw enemies
      gameState.enemies?.forEach(enemy => {
        ctx.fillStyle = '#FF4444'
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)

        // Enemy eyes
        ctx.fillStyle = '#FFF'
        ctx.fillRect(enemy.x + 5, enemy.y + 5, 4, 4)
        ctx.fillRect(enemy.x + 16, enemy.y + 5, 4, 4)
        ctx.fillStyle = '#000'
        ctx.fillRect(enemy.x + 6, enemy.y + 6, 2, 2)
        ctx.fillRect(enemy.x + 17, enemy.y + 6, 2, 2)
      })

      // Draw and check power-ups (only check if not in edit mode)
      gameState.powerUps?.forEach(powerUp => {
        if (!powerUp.collected) {
          // Power-up glow effect
          ctx.shadowColor = powerUp.type === 'speed' ? '#FFD700' :
                           powerUp.type === 'jump' ? '#00FF00' : '#FF69B4'
          ctx.shadowBlur = 15

          switch(powerUp.type) {
            case 'speed':
              ctx.fillStyle = '#FFD700'
              break
            case 'jump':
              ctx.fillStyle = '#00FF00'
              break
            case 'health':
              ctx.fillStyle = '#FF69B4'
              break
          }

          ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height)
          ctx.shadowBlur = 0

          // Power-up collection (only if not in edit mode)
          if (!editMode && player.x < powerUp.x + powerUp.width &&
              player.x + player.width > powerUp.x &&
              player.y < powerUp.y + powerUp.height &&
              player.y + player.height > powerUp.y) {
            powerUp.collected = true
            gameState.score += 25

            // Apply power-up effect
            switch(powerUp.type) {
              case 'speed':
                player.speed = Math.min(player.speed + 1, 8)
                break
              case 'jump':
                player.jumpPower = Math.min(player.jumpPower + 2, 20)
                break
              case 'health':
                player.health = Math.min(player.health + 25, 100)
                break
            }
          }
        }
      })

      // Check coin collection (only if not in edit mode)
      if (!editMode) {
        gameState.coins.forEach(coin => {
          if (!coin.collected &&
              player.x < coin.x + coin.width &&
              player.x + player.width > coin.x &&
              player.y < coin.y + coin.height &&
              player.y + player.height > coin.y) {
            coin.collected = true
            gameState.coinsCollected++
            gameState.score += coin.value
          }
        })
      }

      // Draw coins
      gameState.coins.forEach(coin => {
        if (!coin.collected) {
          // Coin animation
          const bounce = Math.sin(timestamp * 0.005) * 3

          ctx.fillStyle = '#FFD700'
          ctx.shadowColor = '#FFD700'
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(coin.x + coin.width/2, coin.y + coin.height/2 + bounce, coin.width/2, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          // Coin value indicator for high-value coins
          if (coin.value > 10) {
            ctx.fillStyle = '#FFF'
            ctx.font = 'bold 10px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(coin.value.toString(), coin.x + coin.width/2, coin.y + coin.height/2 + bounce + 3)
            ctx.textAlign = 'left'
          }
        }
      })

      // Draw player
      ctx.fillStyle = player.isSliding ? '#FF6B6B' : '#4ECDC4'
      const playerHeight = player.isSliding ? player.height / 2 : player.height
      ctx.fillRect(player.x, player.y + (player.isSliding ? player.height / 2 : 0), player.width, playerHeight)

      // Draw player direction indicator
      ctx.fillStyle = '#2C3E50'
      ctx.fillRect(
        player.x + (player.direction > 0 ? player.width - 5 : 0),
        player.y + 10,
        5,
        10
      )

      // Player health bar
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(player.x - 5, player.y - 15, player.width + 10, 8)
      ctx.fillStyle = player.health > 50 ? '#00FF00' : player.health > 25 ? '#FFFF00' : '#FF0000'
      ctx.fillRect(player.x - 3, player.y - 13, (player.width + 6) * (player.health / 100), 4)

      // Draw bullets
      ctx.fillStyle = '#FFD93D'
      gameState.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
      })

      // Draw edit mode cursor
      if (editMode) {
        ctx.strokeStyle = '#FF0000'
        ctx.lineWidth = 2
        ctx.strokeRect(mousePos.x - 25, mousePos.y - 25, 50, 50)

        // Draw preview of what will be placed
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
        switch(selectedTool) {
          case 'platform':
            ctx.fillRect(mousePos.x - 50, mousePos.y - 10, 100, 20)
            break
          case 'coin':
            ctx.fillRect(mousePos.x - 10, mousePos.y - 10, 20, 20)
            break
          case 'enemy':
            ctx.fillRect(mousePos.x - 12, mousePos.y - 12, 25, 25)
            break
          case 'powerup':
            ctx.fillRect(mousePos.x - 9, mousePos.y - 9, 18, 18)
            break
          case 'delete':
            ctx.strokeStyle = '#FF0000'
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(mousePos.x, mousePos.y, 30, 0, Math.PI * 2)
            ctx.stroke()
            break
        }
      }

      // Restore context
      ctx.restore()

      // Draw UI elements (not affected by camera)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(10, 10, 350, editMode ? 140 : 120)

      ctx.fillStyle = '#FFF'
      ctx.font = '16px Arial'
      ctx.fillText(`Score: ${gameState.score}`, 20, 30)
      ctx.fillText(`Coins: ${gameState.coinsCollected}`, 20, 50)
      ctx.fillText(`Distance: ${Math.round(gameState.furthestDistance)}px`, 20, 70)
      ctx.fillText(`Best: ${Math.round(gameState.bestDistance)}px`, 20, 90)
      ctx.fillText(`Lives: ${player.lives} | Health: ${player.health}%`, 20, 110)

      if (editMode) {
        ctx.fillStyle = '#FFD700'
        ctx.fillText(`Edit Mode - Tool: ${selectedTool}`, 20, 130)
      } else {
        ctx.fillStyle = '#90EE90'
        ctx.fillText(`Press E for editor, R to reset`, 20, 130)
      }

      // Distance progress bar
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(10, canvas.height - 40, canvas.width - 20, 25)
      ctx.fillStyle = '#00FF00'
      const progress = Math.min(player.x / gameState.world.width, 1)
      ctx.fillRect(15, canvas.height - 35, (canvas.width - 30) * progress, 15)
      ctx.fillStyle = '#FFF'
      ctx.font = '12px Arial'
      ctx.fillText(`${Math.round(progress * 100)}% Complete`, 20, canvas.height - 23)

      // Victory message
      if (player.x >= gameState.world.width - 200) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.9)'
        ctx.fillRect(canvas.width/2 - 150, canvas.height/2 - 50, 300, 100)
        ctx.fillStyle = '#000'
        ctx.font = 'bold 24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('🏆 VICTORY! 🏆', canvas.width/2, canvas.height/2 - 20)
        ctx.font = '16px Arial'
        ctx.fillText('You conquered the ultimate challenge!', canvas.width/2, canvas.height/2 + 10)
        ctx.fillText(`Final Score: ${gameState.score}`, canvas.width/2, canvas.height/2 + 30)
        ctx.textAlign = 'left'
      }

      animationId = requestAnimationFrame(gameLoop)
    }

    animationId = requestAnimationFrame(gameLoop)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [initializeGame, editMode, selectedTool, mousePos])

  return (
    <div className="platformer-container">
      {editMode && (
        <div className="level-editor-panel">
          <div className="editor-tools">
            <h3>Level Editor</h3>
            <div className="tool-buttons">
              <button
                className={selectedTool === 'platform' ? 'active' : ''}
                onClick={() => setSelectedTool('platform')}
              >
                Platform
              </button>
              <button
                className={selectedTool === 'coin' ? 'active' : ''}
                onClick={() => setSelectedTool('coin')}
              >
                Coin
              </button>
              <button
                className={selectedTool === 'enemy' ? 'active' : ''}
                onClick={() => setSelectedTool('enemy')}
              >
                Enemy
              </button>
              <button
                className={selectedTool === 'powerup' ? 'active' : ''}
                onClick={() => setSelectedTool('powerup')}
              >
                Power-up
              </button>
              <button
                className={selectedTool === 'delete' ? 'active' : ''}
                onClick={() => setSelectedTool('delete')}
              >
                Delete
              </button>
            </div>

            <div className="editor-actions">
              <button onClick={saveLevel}>Save Level</button>
              <button onClick={loadLevel}>Load Level</button>
              <button onClick={clearLevel}>Clear Level</button>
              <button onClick={() => setEditMode(false)}>Exit Editor</button>
            </div>

            <div className="editor-info">
              <p>Click on the canvas to place objects</p>
              <p>World Size: {gameStateRef.current.world.width} x {gameStateRef.current.world.height}</p>
              <p>Camera: ({Math.round(gameStateRef.current.camera.x)}, {Math.round(gameStateRef.current.camera.y)})</p>
            </div>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="game-canvas"
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      />

      <div className="controls-info">
        <div className="control-section">
          <h4>Game Controls:</h4>
          <div className="control-item">← → Move</div>
          <div className="control-item">↑ Jump</div>
          <div className="control-item">↓ Slide</div>
          <div className="control-item">Space Shoot</div>
          <div className="control-item">R Reset</div>
        </div>

        <div className="control-section">
          <h4>Editor Controls:</h4>
          <div className="control-item">E Enter Edit Mode</div>
          <div className="control-item">ESC Exit Edit Mode</div>
          <div className="control-item">Click Place Object</div>
        </div>
      </div>

      <div className="challenge-info">
        <h3>🏆 Distance Challenge</h3>
        <div className="challenge-stats">
          <div className="stat-item">
            <strong>Current Run:</strong> {Math.round(gameStateRef.current.furthestDistance)}px
          </div>
          <div className="stat-item">
            <strong>Personal Best:</strong> {Math.round(gameStateRef.current.bestDistance)}px
          </div>
          <div className="stat-item">
            <strong>Progress:</strong> {Math.round((gameStateRef.current.player.x / gameStateRef.current.world.width) * 100)}%
          </div>
        </div>

        <div className="difficulty-zones">
          <h4>Difficulty Zones:</h4>
          <div className="zone-item">🟢 0-2000px: Beginner</div>
          <div className="zone-item">🟡 2000-4000px: Intermediate</div>
          <div className="zone-item">🟠 4000-6000px: Advanced</div>
          <div className="zone-item">🔴 6000-8000px: Expert</div>
        </div>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <strong>Score:</strong> {gameStateRef.current.score}
        </div>
        <div className="stat-item">
          <strong>Coins:</strong> {gameStateRef.current.coinsCollected}
        </div>
        <div className="stat-item">
          <strong>Lives:</strong> {gameStateRef.current.player.lives}
        </div>
        <div className="stat-item">
          <strong>Speed:</strong> {gameStateRef.current.player.speed}
        </div>
        <div className="stat-item">
          <strong>Jump Power:</strong> {gameStateRef.current.player.jumpPower}
        </div>
      </div>

      {gameStateRef.current.player.x >= gameStateRef.current.world.width - 200 && (
        <div className="victory-overlay">
          <div className="victory-content">
            <h1>🎉 INCREDIBLE! 🎉</h1>
            <h2>You&apos;ve conquered the ultimate platformer challenge!</h2>
            <div className="victory-stats">
              <p><strong>Final Distance:</strong> {Math.round(gameStateRef.current.furthestDistance)}px</p>
              <p><strong>Final Score:</strong> {gameStateRef.current.score}</p>
              <p><strong>Coins Collected:</strong> {gameStateRef.current.coinsCollected}</p>
              <p><strong>Lives Remaining:</strong> {gameStateRef.current.player.lives}</p>
            </div>
            <p className="victory-message">
              You are among the elite few who can complete this brutal challenge!
              <br />
              Share your achievement and challenge others to beat your score!
            </p>
            <button onClick={() => {
              gameStateRef.current.player.x = 100
              gameStateRef.current.player.y = 300
              gameStateRef.current.score = 0
              gameStateRef.current.coinsCollected = 0
              gameStateRef.current.furthestDistance = 0
              gameStateRef.current.player.lives = 3
              gameStateRef.current.player.health = 100
              gameStateRef.current.player.speed = 5
              gameStateRef.current.player.jumpPower = 15
              gameStateRef.current.coins.forEach(c => c.collected = false)
              gameStateRef.current.powerUps.forEach(p => p.collected = false)
            }}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Platformer
