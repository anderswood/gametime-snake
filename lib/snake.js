var Segment = require('./Segment.js');
// var Food = require('./Food.js');

function  Snake () {
  this.segments = [];
  this.tail = {};
  this.neck = {};
  this.head = {};
  this.direction = 'right';
  this.nextPositionRequest;
  this.nextPosition;
  this.meal;
  this.hasEaten = false;
  this.endGame = false;
}

Snake.prototype.buildSnake = function(initialLength, cellSize) {
  for (var i = 0; i < initialLength; i++) {
    var xPosition = 0;
    this.segments.push(new Segment({x:xPosition, y:30, width: cellSize, height: cellSize, color:''}))
    xPosition += cellSize;
  }
};

Snake.prototype.colorize = function () {
  var colors = ['#000000','#F9FD40','#000000','#000000','#F9FD40','#B12527','#B12527','#F9FD40'];
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].color = colors[i%8];
  }
};

Snake.prototype.draw = function (context) {
  this.segments.forEach(function(snakeBit) {
    snakeBit.draw(context);
  });
}

Snake.prototype.assignBodyParts = function() {
  this.neck = this.segments[this.segments.length - 2];
  this.head = this.segments[this.segments.length - 1];
}

Snake.prototype.getNextPosition = function(directionRequest) {
  this.nextPositionRequest = this.head.nextPosition(directionRequest);
  this.direction = this.neck.detectTurnOnSelf(this.nextPositionRequest, directionRequest, this.direction);
  this.nextPosition = this.head.nextPosition(this.direction);
}

Snake.prototype.detectSelfCollision = function () {
  this.segments.forEach(function(snakeBit, i) {
    if (i != snake.segments.length - 1 && snake.nextPosition.x === snakeBit.x && snake.nextPosition.y === snakeBit.y) {
      console.log('GAMEOVER, dont hit yourself')
      snake.endGame = true
      return;
    }
  });
}

Snake.prototype.detectWallCollision = function(nextPosition, canvasDim){
  if(nextPosition.x < canvasDim.xLeft || nextPosition.x >= canvasDim.xRight || nextPosition.y < canvasDim.yTop || nextPosition.y >= canvasDim.yBottom){
    console.log('death looks so pretty on you');
    snake.endGame = true;
  }
};

Snake.prototype.move = function () {
  if (this.hasEaten === true) {
    this.hasEaten = false;
  } else {
    this.segments.shift();  //remove first object in array (tail)
  }
  var newSeg = new Segment({width: this.head.width, height: this.head.height})
  newSeg.x = this.nextPosition.x;
  newSeg.y = this.nextPosition.y;
  this.segments.push(newSeg);
}


module.exports = Snake;
