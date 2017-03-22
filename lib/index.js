var Food = require('./Food.js');
// var Segment = require('./Segment.js');
var Snake = require('./Snake.js');

var cellSize = 10;
var canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};

var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');
var foodCrumb = new Food({
  width: cellSize,
  height: cellSize,
  color: 'rgba(100, 325, 100, 200)',
  canvasDim
});

var score = document.getElementById('active-score')

var directionRequest = 'right';
var initialLength = 15;

var newGameBtn1 = document.getElementById('new-game-button1');
var newGameBtn2 = document.getElementById('new-game-button2');

var newGameBox = document.getElementById('new-game-box');
var endGameBox = document.getElementById('end-game-box');

// hide game is over box
endGameBox.style.display = 'none';

// startGame();
var snake;

function startGame () {
  snake = new Snake(initialLength, cellSize); //creates initial, empty snake object
  snake.meal = foodCrumb
  breatheLife();
}


// I would like to see this use RequestAnimationFrame
function breatheLife () {

  // move all of these into snake.move
  snake.assignBodyParts();
  snake.getNextPosition(directionRequest);
  snake.detectSelfCollision();
  snake.detectWallCollision(snake.nextPosition, canvasDim);

  // snake.hasFoodCollision(foodCrumb);
  // move inside of snake
  foodCrumb.detectFoodCollision(snake.nextPosition, cellSize, canvasDim);
  foodCrumb = snake.meal;

  if (snake.endGame) {
    console.log('GAMEOVER!')
    gameOver();
    return
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  snake.colorize();
  snake.draw(context);
  foodCrumb.draw(context);
  score.innerText = snake.segments.length;

  setTimeout(breatheLife, 100);
}

function gameOver() {
  endGameBox.style.display = '';
}

document.addEventListener('keydown', function(e) {
  var keys = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};

  if (keys[e.keyCode]) {
    directionRequest = keys[e.keyCode];
  }
});

// you only need one newGameBtn --> move gameOver Text into newGame box
// only show if gameover...
newGameBtn1.addEventListener('click', function() {
  directionRequest = 'right'
  startGame()
  newGameBox.style.display = 'none';
});

// newGameBtn2.onclick = function () {}
newGameBtn2.addEventListener('click', function() {
  directionRequest = 'right'
  startGame()
  endGameBox.style.display = 'none';
});
