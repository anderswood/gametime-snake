var Food = require('./Food.js');
// var Segment = require('./Segment.js');
var Snake = require('./Snake.js');

var cellSize = 10;
var canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var foodCrumb = new Food({width: cellSize, height: cellSize, color: 'rgba(100, 325, 100, 200)', canvasDim});
var score = document.querySelector('#active-score')

var directionRequest = 'right';
var initialLength = 15;

startGame();

function startGame () {
  snake = new Snake(); //creates initial, empty snake object
  snake.buildSnake(initialLength, cellSize); //add 4 segments to snake array
  snake.meal = foodCrumb
  breathLife();
}

function breathLife () {

  snake.assignBodyParts();
  snake.getNextPosition(directionRequest);
  snake.detectSelfCollision();
  snake.detectWallCollision(snake.nextPosition, canvasDim);
  foodCrumb.detectFoodCollision(snake.nextPosition, cellSize, canvasDim);
  foodCrumb = snake.meal;

  if (snake.endGame) {
    console.log('GAMEOVER!')
    return
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  snake.colorize();
  snake.draw(context);
  foodCrumb.draw(context);
  score.innerText = snake.segments.length;

  setTimeout(breathLife, 100);
}

document.addEventListener('keydown', function(e){
  var keys = {37:'left', 38:'up', 39:'right', 40:'down'};
  if (keys[e.keyCode]) {
    directionRequest = keys[e.keyCode];
  }
});
