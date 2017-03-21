var Food = require('./Food.js');
var Segment = require('./Segment.js');
var Snake = require('./Snake.js');

var cellSize = 10;
var canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};
var endGame = false;

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var foodCrumb = new Food({width: cellSize, height: cellSize, color:'rgba(100, 325, 100, 200)', canvasDim});
var score = document.querySelector('#active-score')

var directionRequest = 'right';

startGame();

function startGame (){
  snake = new Snake(); //creates initial, empty snake object
  initialLength = 10;
  snake.buildSnake(initialLength, cellSize); //add 4 segments to snake array
  snake.meal = foodCrumb
  breathLife();
}

function breathLife () {

  context.clearRect(0, 0, canvas.width, canvas.height);
  foodCrumb.draw(context);

  snake.assignBodyParts();
  snake.move(directionRequest, cellSize, canvasDim);
  snake.colorize();
  snake.draw(context);

  snake.head.detectWallCollision(snake.nextPosition, canvasDim);
  foodCrumb.detectFoodCollision(snake.nextPosition);
  //  detectSelfCollision();
  snake.detectSelfCollision();

  foodCrumb = snake.meal;
  score.innerText = snake.segments.length;

  //include a "pauseGame" function?

  //End game (stop animation) if endGame property === true
  if (snake.head.endGame) {
    //  explodeSnake();
    console.log('GAMEOVER!')
    return
  }

  setTimeout(breathLife, 100);
}

document.addEventListener('keydown', function(e){
  var keys = {37:'left', 38:'up', 39:'right', 40:'down'};
  if (keys[e.keyCode]) {
    directionRequest = keys[e.keyCode];
  }
});
