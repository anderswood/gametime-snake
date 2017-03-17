var Block = require('./Block.js');
var Food = require('./food.js');
var Segment = require('./segment.js');
var cellSize = 10;
var canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width: cellSize, height: cellSize, color:'rgba(100, 25, 100, 100)', canvasDim})
var segment1 = new Segment({x:60, y:30, width: cellSize, height: cellSize, color:'rgba(100, 325, 100, 200)'})
var segment2 = new Segment({x:70, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 100, 200)'})
var segment3 = new Segment({x:80, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 300, 250)'})
var segment4 = new Segment({x:90, y:30, width: cellSize, height: cellSize, color:'rgba(150, 225, 200, 30)'})
var snake = [segment1,segment2,segment3,segment4];


var counter = 0;

var directionRequest = 'right';
var direction = 'right';

var tail;
var segmentNeck;
var head;
var nextPositionRequest;
var nextPosition;

function breathLife () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach(function(snakeBit) {
    snakeBit.draw(context);
  })

// adjust speed another way
  // if (counter === 15) {

  tail = snake[0];
  segmentNeck = snake[snake.length - 2]
  head = snake[snake.length - 1];
  console.log(head);


  nextPositionRequest = head.nextPosition(directionRequest, cellSize);
  console.log(nextPositionRequest);

  direction = segmentNeck.detectTurnOnSelf(nextPositionRequest, directionRequest, direction);
  nextPosition = head.nextPosition(direction, cellSize);
  snake.shift();  //remove first object in array (tail)

  head.detectWallCollision(nextPosition, canvasDim);
  food.detectFoodCollision(nextPosition);
 //  detectSelfCollision();

  tail.x = nextPosition.x;
  tail.y = nextPosition.y;
  snake.push(tail); //insert tail into head position
  // counter = 0
  // }

  // counter++


  food.draw(context);

  setTimeout(breathLife, 100)
}

breathLife()



//check if direction is backwards for the snake
  //if yes: do not update var direction
  //if no: update var direction

document.addEventListener('keydown', function(e){
  var keys = {37:'left', 38:'up', 39:'right', 40:'down'};
  if (keys[e.keyCode]) {
    directionRequest = keys[e.keyCode];
  };
  console.log(directionRequest);

});
