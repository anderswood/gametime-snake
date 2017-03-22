var Segment = require('./Segment.js');
const COLOR_BLACK = '#000000';

// nice to have es6 class
function Snake (initialLength, cellSize) {
  this.segments = [];
  this.tail = {};
  this.neck = {};
  this.head = {};
  this.direction = 'right';
  this.nextPosition;
  this.meal;
  this.hasEaten = false;
  this.endGame = false;
  this.buildSnake(initialLength, cellSize);
}

Snake.prototype.buildSnake = function(initialLength, cellSize) {
  for (var i = 0; i < initialLength; i++) {
    var xPosition = 0;

    this.segments.push(
      new Segment({
        x: xPosition,
        y: 30,
        width: cellSize,
        height: cellSize,
        color: ''
      }
    ))
    xPosition += cellSize;
  }
};

Snake.prototype.colorize = function () {
  var colors = [
    COLOR_BLACK,
    '#F9FD40',
    '#000000',
    '#000000',
    '#F9FD40',
    '#B12527',
    '#B12527',
    '#F9FD40'
  ];
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].color = colors[i % 8];
  }
};

Snake.prototype.draw = function (context) {
  this.segments.forEach(function(snakeBit) {
    snakeBit.draw(context);
  });
}

Snake.prototype.assignBodyParts = function () {
  this.neck = this.segments[this.segments.length - 2];
  this.head = this.segments[this.segments.length - 1];
}

Snake.prototype.getNextPosition = function(directionRequest) {
  // where we want to go
  var nextPositionRequest = this.head.nextPosition(directionRequest);

  // is the next position open, are we going to hit self
  this.direction = this.neck.detectTurnOnSelf(
    nextPositionRequest,
    directionRequest,
    this.direction
  );

  // heads next position
  this.nextPosition = this.head.nextPosition(this.direction);
}

Snake.prototype.detectSelfCollision = function () {
  this.segments.forEach(function(snakeBit, i) {
    if (i != this.segments.length - 1 &&
        this.nextPosition.x === snakeBit.x &&
        this.nextPosition.y === snakeBit.y) {

      console.log('GAMEOVER, dont hit yourself')
      this.endGame = true
      return;
    }
  }.bind(this));
}

Snake.prototype.detectWallCollision = function(nextPosition, canvasDim){
  if (nextPosition.x < canvasDim.xLeft ||
      nextPosition.x >= canvasDim.xRight ||
      nextPosition.y < canvasDim.yTop ||
      nextPosition.y >= canvasDim.yBottom) {

    console.log('death looks so pretty on you');
    this.endGame = true;
  }
};

Snake.prototype.move = function () {
  if (this.hasEaten) {
    this.hasEaten = false;

  } else {
    this.segments.shift();  //remove first object in array (tail)
  }

  // a little wasteful, but it works
  var newSeg = new Segment({width: this.head.width, height: this.head.height})

  newSeg.x = this.nextPosition.x;
  newSeg.y = this.nextPosition.y;

  this.segments.push(newSeg);
}


module.exports = Snake;
