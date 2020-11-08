let paintbox = document.getElementById('paintbox')
let context = paintbox.getContext('2d')
let gameOn = true


class Box {
    constructor(size, color) {
        this.size = size
        this.color = color
        this.x = 0
        this.y = 0
    }
}

class Player extends Box {
    constructor() {
        super(50, "blue")
        this.x = 0
        this.y = 200
        this.speed = 0
        this.yspeed = 0
    }
    move() {
        this.x += this.speed
    }
}

class Enemy extends Box {
    constructor(speed) {
        super(50, "red")
        this.speed = speed
    }
    move() {
        this.y += this.speed
        if (this.y + this.size > 450 || this.y < 0)
            this.speed = -1 * this.speed
    }
}

class Bullet extends Box {
    constructor(speed) {
        super(10, "darkred")
        this.speed = speed
        this.x = 800
        this.y = Math.floor(Math.random() * 450)
    }
    move() {
        this.x -= this.speed
    }
}


setInterval(() => {
    let b = new Bullet(5)
    if (!gameOn) {
        alert("game over")
        return
    }
    function fire() {
        context.clearRect(b.x, b.y, b.size, b.size)
        b.move()
        drawBox(b)
        if (isCollided(player, b))
            gameOn = false
        window.requestAnimationFrame(fire)
    }

    fire()
}, 500)


let player = new Player()
let e1 = new Enemy(5)
let e2 = new Enemy(10)
let e3 = new Enemy(15)
let e4 = new Enemy(17)
e1.x = 120
e2.x = 290
e3.x = 460
e4.x = 630


function isCollided(enemy, player) {
    if (
        ((player.x + player.size) > enemy.x)
        && (player.x < (enemy.x + enemy.size))
        && (((player.y > enemy.y) && (player.y < (enemy.y + enemy.size))) || ((player.y + player.size > enemy.y) && (player.y + player.size < (enemy.y + enemy.size))))
    )
        return true
}


function drawBox(box) {
    context.fillStyle = box.color
    context.fillRect(box.x, box.y, box.size, box.size)
}



let btnUp = document.getElementById('btnUp')
let btnDown = document.getElementById('btnDown')

let yspeedClearIntervalIdUp
btnUp.addEventListener('mousedown', () => {
    player.yspeed = 5
    yspeedClearIntervalIdUp = setInterval(() => {
        if (player.y < 0)
            clearInterval(yspeedClearIntervalIdUp)
        else {
            context.clearRect(player.x, player.y, player.size, player.size)
            player.y -= player.yspeed
            drawBox(player)
        }
    }, 0)
})
btnUp.addEventListener('mouseup', () => {
    player.yspeed = 0
    clearInterval(yspeedClearIntervalIdUp)
})


let yspeedClearIntervalIdDown
btnDown.addEventListener('mousedown', () => {
    player.yspeed = 5
    yspeedClearIntervalIdDown = setInterval(() => {
        if (player.y + player.size > 450)
            clearInterval(yspeedClearIntervalIdDown)
        else {
            context.clearRect(player.x, player.y, player.size, player.size)
            player.y += player.yspeed
            drawBox(player)
        }
    }, 0)
})
btnDown.addEventListener('mouseup', () => {
    player.yspeed = 0
    clearInterval(yspeedClearIntervalIdDown)
})


window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowDown":
            player.yspeed = 5
            yspeedClearIntervalIdDown = setInterval(() => {
                if (player.y + player.size > 450)
                    clearInterval(yspeedClearIntervalIdDown)
                else {
                    context.clearRect(player.x, player.y, player.size, player.size)
                    player.y += player.yspeed
                    drawBox(player)
                }
            }, 0)
            break;
        case "ArrowUp":
            player.yspeed = 5
            yspeedClearIntervalIdUp = setInterval(() => {
                if (player.y < 0)
                    clearInterval(yspeedClearIntervalIdUp)
                else {
                    context.clearRect(player.x, player.y, player.size, player.size)
                    player.y -= player.yspeed
                    drawBox(player)
                }
            }, 0)
            break;
        case "ArrowRight":
            player.speed = 10
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
})
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowDown":
            player.yspeed = 0
            clearInterval(yspeedClearIntervalIdDown)
            break;
        case "ArrowUp":
            player.yspeed = 0
            clearInterval(yspeedClearIntervalIdUp)
            break;
        case "ArrowRight":
            player.speed = 0
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
})



// function playerMovingDown() {

//     if (player.y + player.size > 450)
//         return
//     else {
//         context.clearRect(player.x, player.y, player.size, player.size)
//         player.y += player.yspeed
//         drawBox(player)
//         window.requestAnimationFrame(playerMovingDown)
//     }
// }

// function playerMovingUp() {
//     if (player.y < 0)
//         return
//     else {
//         context.clearRect(player.x, player.y, player.size, player.size)
//         player.y -= player.yspeed
//         drawBox(player)
//         window.requestAnimationFrame(playerMovingUp)
//     }

// }

// window.addEventListener("keydown", (event) => {
//     if (event.key == "ArrowDown") {
//         player.yspeed = 2
//         playerMovingDown()
//     }
//     else if (event.key == "ArrowUp") {
//         player.yspeed = 2
//         playerMovingUp()
//     }
//     else if (event.key == "ArrowRight") {
//         player.speed = 10
//     }
//     else
//         return // Quit when this doesn't handle the key event.
// })

// window.addEventListener("keyup", (event) => {

//     if (event.key == "ArrowDown") {
//         player.yspeed = 0
//     }

//     if (event.key == "ArrowUp") {
//         player.yspeed = 0
//     }

//     if (event.key == "ArrowRight")
//         player.speed = 0
//     else
//         return; // Quit when this doesn't handle the key event.
// })




//addEventListener listens to event called mousedown and calls a function
paintbox.addEventListener('mousedown', () => {
    player.speed = 10
})

//there is also a event called mouseup
paintbox.addEventListener('mouseup', () => {
    player.speed = 0
})

// This function doesnot gives us a smooth animation and the box passes the canvas
// setInterval(() => {
//     context.clearRect(0, 0, 500, 500)
//     e1.y += e1.speed
//     e2.y += e2.speed
//     drawBox(e1)
//     drawBox(e2)
// }, 0)

//requestAnimaitionFrame() helps us get smooth animation
// function updateGame() {
//     window.requestAnimationFrame(() => {
//         context.clearRect(0, 0, 500, 500)
//         e1.move()
//         e2.move()
//         drawBox(e1)
//         drawBox(e2)
//         updateGame()
//     })

// }
// updateGame()


//We can the use requestAnimationFrame() this way as well
function gameLoop() {
    if (!gameOn) {
        alert("game over")
        return
    }
    context.clearRect(player.x, player.y, player.size, player.size)
    context.clearRect(e1.x, e1.y, e1.size, e1.size)
    context.clearRect(e2.x, e2.y, e2.size, e2.size)
    context.clearRect(e3.x, e3.y, e3.size, e3.size)
    context.clearRect(e4.x, e4.y, e4.size, e4.size)
    //context.clearRect(0, 0, 1000, 1000)

    player.move()
    e1.move()
    e2.move()
    e3.move()
    e4.move()



    if (isCollided(e1, player) || isCollided(e2, player) || isCollided(e3, player) || isCollided(e4, player)) {
        gameOn = false
    }
    drawBox(player)
    drawBox(e1)
    drawBox(e2)
    drawBox(e3)
    drawBox(e4)

    window.requestAnimationFrame(gameLoop)
}
gameLoop()

console.log("This line gets printed")