const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const scoreEl = document.querySelector('#scoreEl')
import {Boundary} from './models/boundary.js'
import {Player} from './models/player.js'
import {Ghost} from './models/Ghost.js'
import {Pellet} from './models/pellet.js'

canvas.width = innerWidth
canvas.height = innerHeight

// Boundary class...............................
const boundaries = []
let grave = []


// Player class............................

// Player position and velocity
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  },
  canvasC: c
})
const player2 = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2 + 500,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  },
  canvasC: c
})

// Ghost class...................................................
const ghosts = [
  new Ghost({
    position: {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2
    },
    velocity: {
      x: Ghost.speed,
      y: 0
    },
    canvasGhost: c
  }),
  new Ghost({
    position: {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height * 3 + Boundary.height / 2
    },
    velocity: {
      x: Ghost.speed,
      y: 0
    },
    color: 'pink',
    canvasGhost: c
  }),
  new Ghost({
    position: {
      x: Boundary.width * 6 + Boundary.width / 2 + 500,
      y: Boundary.height + Boundary.height / 2
    },
    velocity: {
      x: Ghost.speed,
      y: 0
    },
    color: 'orange',
    canvasGhost: c
  }),
  new Ghost({
    position: {
      x: Boundary.width * 6 + Boundary.width / 2 + 500,
      y: Boundary.height * 3 + Boundary.height / 2
    },
    velocity: {
      x: Ghost.speed,
      y: 0
    },
    color: 'cyan',
    canvasGhost: c
  })
]
let startA = true
let startB = true
if (Math.floor(Math.random() * 2) == 0) {
  ghosts[0].scared = true
  ghosts[1].scared = true
  startA = false
} else {
  ghosts[2].scared = true
  ghosts[3].scared = true
  startB = false
}

// Pellets class.............................................................
const pellets = []


// PowerUp class.............................................................
class PowerUp {
  constructor({ position }) {
    this.position = position
    this.radius = 8
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'white'
    c.fill()
    c.closePath()
  }
}
const powerUps = []
const umm = []

// Create and draw the map...............................
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

// create an image of map
function createImage(src) {
  const image = new Image()
  image.src = src
  return image
}

// create a map and pellets
function mapp (map, x, start) {
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j + x,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeHorizontal.png'),
            canvasContext: c
          })
        )
        break
      case '|':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j + x,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeVertical.png'),
            canvasContext: c
          })
        )
        break
      case '1':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j + x,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner1.png'),
            canvasContext: c
          })
        )
        break
      case '2':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j + x,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner2.png'),
            canvasContext: c
          })
        )
        break
      case '3':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j + x,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner3.png'),
            canvasContext: c
          })
        )
        break
      case '4':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j + x,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner4.png'),
            canvasContext: c
          })
        )
        break
      case 'b':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j + x,
              y: Boundary.height * i
            },
            image: createImage('./img/block.png'),
            canvasContext: c
          })
        )
        break
      case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            image: createImage('./img/capLeft.png'),
            canvasContext: c
          })
        )
        break
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            image: createImage('./img/capRight.png'),
            canvasContext: c

          })
        )
        break
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            image: createImage('./img/capBottom.png'),
            canvasContext: c

          })
        )
        break
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            image: createImage('./img/capTop.png'),
            canvasContext: c

          })
        )
        break
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeCross.png'),
            canvasContext: c

          })
        )
        break
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorTop.png'),
            canvasContext: c

          })
        )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorRight.png'),
            canvasContext: c

          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorBottom.png'),
            canvasContext: c

          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + x,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeConnectorLeft.png'),
            canvasContext: c

          })
        )
        break
      case '.':
        pellets.push(
          new Pellet({
            position: {
              x: j * Boundary.width + Boundary.width / 2 + x,
              y: i * Boundary.height + Boundary.height / 2
            },
            can: c
          })
        )
        break
      case 'p':
        if (start) {
          powerUps.push(
            new PowerUp({
              position: {
                x: j * Boundary.width + Boundary.width / 2 + x,
                y: i * Boundary.height + Boundary.height / 2
              }
            })
          )
          break
        } else {
          pellets.push(
            new Pellet({
              position: {
                x: j * Boundary.width + Boundary.width / 2 + x,
                y: i * Boundary.height + Boundary.height / 2
              },
              can: c
            })
          )
          break
        }
    }
  })
})
}
mapp(map, 0, startA)
pellets.forEach(pellet => {
  umm.push(pellet)
});
mapp(map, 500, startB)



// Create keyevents when pressed down key w, a, s, d
const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}
let lastkey = ''
let score = 0

const keys2 = {
  ArrowUp: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
}
let lastkey2 = ''
let score2 = 0

window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);




// Keydown update when player pressed
addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true
      lastkey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastkey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastkey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastkey = 'd'
      break
  }
})


addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowUp':
      keys2.ArrowUp.pressed = true
      lastkey2 = 'ArrowUp'
      break
    case 'ArrowLeft':
      keys2.ArrowLeft.pressed = true
      lastkey2 = 'ArrowLeft'
      break
    case 'ArrowDown':
      keys2.ArrowDown.pressed = true
      lastkey2 = 'ArrowDown'
      break
    case 'ArrowRight':
      keys2.ArrowRight.pressed = true
      lastkey2 = 'ArrowRight'
      break
  }
})

// Keyup update when player release
addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'ArrowUp':
      keys2.ArrowUp.pressed = false
      break
    case 'ArrowLeft':
      keys2.ArrowLeft.pressed = false
      break
    case 'ArrowDown':
      keys2.ArrowDown.pressed = false
      break
    case 'ArrowRight':
      keys2.ArrowRight.pressed = false
      break
  }
})

// collision detection when player collides with blocks.......................
function circleCollidesWithRectangele({ circle, rectangle }) {
  const padding = Boundary.width / 2 - circle.radius - 1
  return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding
    && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding
    && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding
    && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding)

}

var lose = false


// Animation for player moving around the map and touching the pellets...............
let animationId
function animate() {
  animationId = requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  // player moving around the map when pressing a,s,w,d
  if (keys.w.pressed && lastkey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player, velocity: {
            x: 0,
            y: -5
          }
        },
        rectangle: boundary
      })) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = -5
      }
    }
  } else if (keys.a.pressed && lastkey === 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player, velocity: {
            x: -5,
            y: 0
          }
        },
        rectangle: boundary
      })) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = -5
      }
    }
  } else if (keys.s.pressed && lastkey === 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player, velocity: {
            x: 0,
            y: 5
          }
        },
        rectangle: boundary
      })) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = 5
      }
    }
  } else if (keys.d.pressed && lastkey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player, velocity: {
            x: 5,
            y: 0
          }
        },
        rectangle: boundary
      })) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = 5
      }
    }
  }
}



// Animation for player moving around the map and touching the pellets...............
let animationId2
function animate2() {
  animationId2 = requestAnimationFrame(animate2)
  c.clearRect(0, 0, canvas.width, canvas.height)
  // player moving around the map when pressing a,s,w,d
  if (keys2.ArrowUp.pressed && lastkey2 === 'ArrowUp') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player2, velocity: {
            x: 0,
            y: -5
          }
        },
        rectangle: boundary
      })) {
        player2.velocity.y = 0
        break
      } else {
        player2.velocity.y = -5
      }
    }
  } else if (keys2.ArrowLeft.pressed && lastkey2 === 'ArrowLeft') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player2, velocity: {
            x: -5,
            y: 0
          }
        },
        rectangle: boundary
      })) {
        player2.velocity.x = 0
        break
      } else {
        player2.velocity.x = -5
      }
    }
  } else if (keys2.ArrowDown.pressed && lastkey2 === 'ArrowDown') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player2, velocity: {
            x: 0,
            y: 5
          }
        },
        rectangle: boundary
      })) {
        player2.velocity.y = 0
        break
      } else {
        player2.velocity.y = 5
      }
    }
  } else if (keys2.ArrowRight.pressed && lastkey2 === 'ArrowRight') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollidesWithRectangele({
        circle: {
          ...player2, velocity: {
            x: 5,
            y: 0
          }
        },
        rectangle: boundary
      })) {
        player2.velocity.x = 0
        break
      } else {
        player2.velocity.x = 5
      }
    }
  }


  // detect collision between ghosts and player
  for (let i = ghosts.length - 1; 0 <= i; i--) {
    const ghost = ghosts[i]
    // ghost touches player
    if (player.isDead == false && Math.hypot(
      ghost.position.x - player.position.x,
      ghost.position.y - player.position.y) < ghost.radius + player.radius) {
      if (ghost.scared) {
        grave.push(ghost)
        ghosts.splice(i, 1)
      } else if (player.lives > 1) {
        player.die()
        setTimeout(function(){
          player.isDead = false
        }, 500)
      } else {
        player.die()
        cancelAnimationFrame(animationId)
        console.log('you lose')
        endGame2()
      }
    }
    if (player2.isDead == false && Math.hypot(
      ghost.position.x - player2.position.x,
      ghost.position.y - player2.position.y) < ghost.radius + player2.radius) {
      if (ghost.scared) {
        grave.push(ghost)
        ghosts.splice(i, 1)
      } else if (player2.lives > 1) {
        player2.die()
        setTimeout(function(){
          player2.isDead = false
        }, 500)
      } else {
        player2.die()
        cancelAnimationFrame(animationId2)
        console.log('you lose')
        endGame1()
      }
    }
  }

function GhostRes () {

  grave.forEach(ghost => {
    ghosts.push(ghost)
  })
  grave = []

}

  // Win condition when touching all the pellets
  if (pellets.length === 0) {
    console.log('you win')
    cancelAnimationFrame(animationId)
  }

  // power ups go
  for (let i = powerUps.length - 1; 0 <= i; i--) {
    const powerUp = powerUps[i]
    powerUp.draw()
    // player collides with powerup
    if (Math.hypot(
      powerUp.position.x - player.position.x,
      powerUp.position.y - player.position.y) < powerUp.radius + player.radius) {
      powerUps.splice(i, 1)
      GhostRes()
      i = Math.floor(Math.random()*umm.length)
      let place = umm[i]
      powerUps.push(
        new PowerUp({
          position: {
            x: place.position.x + 500,
            y: place.position.y
          }
        })
      )

      // make ghost scared
      ghosts.forEach(ghost => {
        if (ghost.scared == true) {
          ghost.scared = false
        } else {
          ghost.scared = true
        }
      })
    }
    if (Math.hypot(
      powerUp.position.x - player2.position.x,
      powerUp.position.y - player2.position.y) < powerUp.radius + player2.radius) {
      powerUps.splice(i, 1)
      GhostRes()
      i = Math.floor(Math.random()*umm.length)
      let place = umm[i]
      powerUps.push(
        new PowerUp({
          position: {
            x: place.position.x,
            y: place.position.y
          }
        })
      )
      // make ghost scared
      ghosts.forEach(ghost => {
        if (ghost.scared == true) {
          ghost.scared = false
        } else {
          ghost.scared = true
        }
      })
    }
  }

  // remove the pellets after touching and update the score
  for (let i = pellets.length - 1; 0 <= i; i--) {
    const pellet = pellets[i]
    pellet.draw()
    if (pellet.active && Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
      console.log('touching')
      player.eatPellet()
      pellet.hide()
      if ((player.getPellet() % 100) == 0) {
        player.addlife()
      }
      setTimeout(function (){
        pellet.color = "white"
        pellet.active = true
      }, 20000)

    }
    if (pellet.active && Math.hypot(pellet.position.x - player2.position.x, pellet.position.y - player2.position.y) < pellet.radius + player2.radius) {
      console.log('touching')
      pellet.hide()
      player2.eatPellet()
      if ((player2.getPellet() % 100) == 0) {
        player2.addlife()
      }
      setTimeout(function (){
        pellet.color = "white"
        pellet.active = true
      }, 20000)
    }
    scoreEl.innerHTML = player.lives + "  -  " + player2.lives
  }

  // if the player collides with the boundaries/blocks , return velocity to 0
  boundaries.forEach((boundary) => {
    boundary.draw()

    if (circleCollidesWithRectangele({
      circle: player,
      rectangle: boundary
    })
    ) {
      console.log('We are colliding')
      player.velocity.y = 0
      player.velocity.x = 0
    }

    if (circleCollidesWithRectangele({
      circle: player2,
      rectangle: boundary
    })
    ) {
      console.log('We are colliding')
      player2.velocity.y = 0
      player2.velocity.x = 0
    }
  })



  player.update()
  player2.update()

  // ghost moving around the map randomly
  ghosts.forEach(ghost => {
    ghost.update()
    const collisions = []
    boundaries.forEach(boundary => {
      if (!collisions.includes('right') && circleCollidesWithRectangele({
        circle: {
          ...ghost, velocity: {
            x: ghost.speed,
            y: 0
          }
        },
        rectangle: boundary
      })) {
        collisions.push('right')
      }
      if (!collisions.includes('left') && circleCollidesWithRectangele({
        circle: {
          ...ghost, velocity: {
            x: -ghost.speed,
            y: 0
          }
        },
        rectangle: boundary
      })) {
        collisions.push('left')
      }
      if (!collisions.includes('up') && circleCollidesWithRectangele({
        circle: {
          ...ghost, velocity: {
            x: 0,
            y: -ghost.speed
          }
        },
        rectangle: boundary
      })) {
        collisions.push('up')
      }
      if (!collisions.includes('down') && circleCollidesWithRectangele({
        circle: {
          ...ghost, velocity: {
            x: 0,
            y: ghost.speed
          }
        },
        rectangle: boundary
      })) {
        collisions.push('down')
      }
    })
    if (collisions.length > ghost.prevCollisions.length)
      ghost.prevCollisions = collisions

    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
      else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
      else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
      else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

      console.log(collisions)
      console.log(ghost.prevCollisions)

      const pathways = ghost.prevCollisions.filter((collision) => {
        return !collisions.includes(collision)
      })
      console.log({ pathways })

      const direction = pathways[Math.floor(Math.random() * pathways.length)]

      console.log({ direction })

      switch (direction) {
        case 'down':
          ghost.velocity.y = ghost.speed
          ghost.velocity.x = 0
          break
        case 'up':
          ghost.velocity.y = -ghost.speed
          ghost.velocity.x = 0
          break
        case 'right':
          ghost.velocity.y = 0
          ghost.velocity.x = ghost.speed
          break
        case 'left':
          ghost.velocity.y = 0
          ghost.velocity.x = -ghost.speed
          break
      }
      ghost.prevCollisions = []
    }
  })

  // player rotation when moving
  if ( player.velocity.x > 0) player.rotation = 0
  else if ( player.velocity.x < 0) player.rotation = Math.PI
  else if ( player.velocity.y > 0) player.rotation = Math.PI/2
  else if ( player.velocity.y < 0) player.rotation = Math.PI * 1.5

  if ( player2.velocity.x > 0) player2.rotation = 0
  else if ( player2.velocity.x < 0) player2.rotation = Math.PI
  else if ( player2.velocity.y > 0) player2.rotation = Math.PI/2
  else if ( player2.velocity.y < 0) player2.rotation = Math.PI * 1.5
}
// end of animate().........................

function startGame(){
  startGameBtn.style.display = 'none';
  animate()
  animate2()
  document.getElementById ("score-display").style.display = "block";
  restartBtn.style.display = "block";
}
document.getElementById ("startGameBtn").addEventListener ("click",startGame, false);

function endGame1(){
  canvas.style.display = "none";
  document.getElementById("winner1-screen").style.display ="block";
  restartBtn.style.display = "block";
}

function endGame2(){
  canvas.style.display = "none";
  document.getElementById("winner2-screen").style.display ="block";
  restartBtn.style.display = "block";
}