// declare global variables to track game board size
const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT ** 2 

// track scores to display to user
let totalFoodEaten = 0
let totalDistanceTraveled = 0

// shorten reference to game board
const gameContainer = document.getElementById('gameContainer')

const createGameBoardPixels = _ => {
  for (let i = 1; i <= TOTAL_PIXEL_COUNT; i++) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`
    
  }
}

const gameBoardPixels = document.getElementsByClassName("gameBoardPixel")

let currentFoodPosition = 0

// create the randomly generated food items in teh game board
const createFood = _ => {
  gameBoardPixels[currentFoodPosition].classList.remove("food")
  currentFoodPosition = Math.floor(Math.random()*TOTAL_PIXEL_COUNT)
  gameBoardPixels[currentFoodPosition].classList.add('food')
}

// Start setting up snake behaviour

const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

// initial direction for snake
let snakeCurrentDirection = RIGHT_DIR

const changeDirection = newDirectionCode => {
  if (newDirectionCode == snakeCurrentDirection) return;

  if (newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR) {
    snakeCurrentDirection = newDirectionCode
  } else if (newDirectionCode == UP_DIR && snakeCurrentDirection !== DOWN_DIR) {
    snakeCurrentDirection = newDirectionCode
  } else if (newDirectionCode == RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR) {
    snakeCurrentDirection = newDirectionCode
  } else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR) {
    snakeCurrentDirection = newDirectionCode
  }
}

// set starting point for snake on load
let currentHeadPosition = TOTAL_PIXEL_COUNT / 2

// set initial length
let snakeLength = 200

// start moving snake
const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case LEFT_DIR:
      --currentHeadPosition
      const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0
      if (isHeadAtLeft) {
        currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
      }
      break;
    case RIGHT_DIR:
      ++currentHeadPosition
      const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
      if (isHeadAtRight) {
        currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
      }
      break;
    case UP_DIR:
      currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
      const isHeadAtTop = currentHeadPosition < 0
      if (isHeadAtTop) {
        currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT
      }
      break;
    case DOWN_DIR:
      currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
      const isHeadAtBot = currentHeadPosition > 1599
      if (isHeadAtBot) {
        currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT
      }
      break;
    default:
      break;
  }
  let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition]

  if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
    alert(`You have eaten ${totalFoodEaten} food and traveled ${totalDistanceTraveled} blocks`)
    window.location.reload()
  }
  // assuming an empty pixel, add snake body styling
  nextSnakeHeadPixel.classList.add("snakeBodyPixel")

  // remove snake styling to keep snake appropriate length
  setTimeout( () => {
    nextSnakeHeadPixel.classList.remove("snakeBodyPixel")
  }, snakeLength)

  // describe what to do if the snake encounters a food pixel
  if (currentHeadPosition == currentFoodPosition) {
    totalFoodEaten++ 
    snakeLength += 100
    document.getElementById("pointsEarned").innerHTML = totalFoodEaten
    createFood()
  }

  totalDistanceTraveled++
  document.getElementById("blocksTraveled").innerText = totalDistanceTraveled
}

// call initial functions to create board and start game
createGameBoardPixels();
createFood();

// set animation speed
let moveSnakeInterval = setInterval(moveSnake, 100)

// add event listeners for our keyboard keys
// listen for any keydown action and pass it into the change direction function
addEventListener("keydown", e => changeDirection(e.keyCode))

const leftButton = document.getElementById('leftButton')
const rightButton = document.getElementById('rightButton')
const upButton = document.getElementById('upButton')
const downButton = document.getElementById('downButton')

// add listeners for arrow keys
leftButton.onclick = () => changeDirection(LEFT_DIR)
rightButton.onclick = () => changeDirection(RIGHT_DIR)
upButton.onclick = () => changeDirection(UP_DIR)
downButton.onclick = () => changeDirection(DOWN_DIR)