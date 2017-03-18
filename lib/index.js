var Block = require('./Block.js');
var Food = require('./food.js');
var Segment = require('./segment.js');
var Snake = require('./snake.js');
var cellSize = 10;
var canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width: cellSize, height: cellSize, color:'rgba(100, 25, 100, 100)', canvasDim})

var directionRequest = 'right';
var direction = 'right';
var nextPositionRequest;
var nextPosition;

var snakeObj;
var snake;

startGame();

function startGame (){
  snakeObj = new Snake(); //creates initial, empty snake
  snakeObj.buildSnake(cellSize); //add 4 segments to snake array
  breathLife();
}

function breathLife () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snakeObj.segments.forEach(function(snakeBit) {
    snakeBit.draw(context);
  });

  snakeObj.assignBodyParts();
  nextPositionRequest = snakeObj.head.nextPosition(directionRequest, cellSize);


  direction = snakeObj.neck.detectTurnOnSelf(nextPositionRequest, directionRequest, direction);
  nextPosition = snakeObj.head.nextPosition(direction, cellSize);
  snakeObj.segments.shift();  //remove first object in array (tail)

  snakeObj.head.detectWallCollision(nextPosition, canvasDim);
  food.detectFoodCollision(nextPosition);
 //  detectSelfCollision();

  snakeObj.tail.x = nextPosition.x;
  snakeObj.tail.y = nextPosition.y;
  snakeObj.segments.push(snakeObj.tail); //insert tail into head position
  food.draw(context);
  setTimeout(breathLife, 100);
}

document.addEventListener('keydown', function(e){
  var keys = {37:'left', 38:'up', 39:'right', 40:'down'};
  if (keys[e.keyCode]) {
    directionRequest = keys[e.keyCode];
  }
});
