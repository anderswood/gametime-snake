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

requestAnimationFrame(function gameLoop () {
   context.clearRect(0, 0, canvas.width, canvas.height);

// adjust speed another way
   if (counter === 15) {

   var tail = snake[0];
   var segmentNeck = snake[snake.length - 2]
   var head = snake[snake.length - 1];

   snake.shift();  //remove first object in array (tail)

   var nextPositionRequest = head.nextPosition(directionRequest, cellSize);
   direction = segmentNeck.detectTurnOnSelf(nextPositionRequest, directionRequest, direction);
   var nextPosition = head.nextPosition(direction, cellSize);

   head.detectWallCollision(nextPosition, canvasDim);
   food.detectFoodCollision(nextPosition);
  //  detectSelfCollision();

   tail.x = nextPosition.x;
   tail.y = nextPosition.y;
   snake.push(tail); //insert tail into head position
   counter = 0
   }

   counter++

   snake.forEach(function(snakeBit) {
     snakeBit.draw(context);
   })

   food.draw(context);

 requestAnimationFrame(gameLoop);
});

var directionRequest = 'right';
var direction = 'right';

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
