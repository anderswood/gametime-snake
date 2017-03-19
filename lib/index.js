var Block = require('./Block.js');
var Food = require('./food.js');
var Segment = require('./segment.js');
var Snake = require('./snake.js');

var cellSize = 10;
var canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};
var endGame = false;

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width: cellSize, height: cellSize, color:'rgba(100, 25, 100, 100)', canvasDim})

var directionRequest = 'right';
var direction = 'right';
var nextPositionRequest;
var nextPosition;

var snake;
var snake;

startGame();

function startGame (){
  snake = new Snake(); //creates initial, empty snake object
  snake.buildSnake(cellSize); //add 4 segments to snake array
  breathLife();
}

function breathLife () {

  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw(context);
  snake.assignBodyParts();
  //snake.moveRequest()
  //snake.move()

  nextPositionRequest = snake.head.nextPosition(directionRequest);
  direction = snake.neck.detectTurnOnSelf(nextPositionRequest, directionRequest, direction);
  nextPosition = snake.head.nextPosition(direction, cellSize);

  snake.segments.shift();  //remove first object in array (tail)

  snake.head.detectWallCollision(nextPosition, canvasDim);
  food.detectFoodCollision(nextPosition);
 //  detectSelfCollision();


  snake.tail.x = nextPosition.x;
  snake.tail.y = nextPosition.y;
  snake.segments.push(snake.tail); //insert tail into head position
  food.draw(context);


  //End game (stop animation) if endGame property === true
  if (snake.head.endGame) {
    //  explodeSnake();
    alert('GAMEOVER!')
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
