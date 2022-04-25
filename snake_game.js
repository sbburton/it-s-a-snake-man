// declare global variables to track game board size
const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT ** 2 

// track scores to display to user
let totalFoodEaten = 0
let totalDistanceTraveled = 0

// shorten reference to game board
const gameContainer = document.getElementById('gameContainer')

const createGameBoardPixels = _ => {
  for (let i = 0; i < TOTAL_PIXEL_COUNT; i++) {
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


