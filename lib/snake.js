var Segment = require('./segment.js');
var Food = require('./food.js');

const COLOR_BLACK = '#000000';
const COLOR_YELLOW = '#F9FD40';
const COLOR_RED = '#B12527';


class Snake {
  constructor (initialLength, cellSize) {
    this.segments = [];
    this.neck = {};
    this.head = {};
    this.direction = 'right';
    this.nextPosition;
    this.meal;
    this.hasEaten = false;
    this.endGame = false;
    this.buildSnake (initialLength, cellSize);
    this.assignBodyParts();
  }

  buildSnake (initialLength, cellSize) {
    for (var i = 0; i < initialLength; i++) {
      var xPosition = 0;

      this.segments.push(new Segment({
        x: xPosition,
        y: 30,
        width: cellSize,
        height: cellSize,
        color: ''
      }))
      xPosition += cellSize;
    }
  }

  colorize () {
    var colors = [
      COLOR_BLACK,
      COLOR_YELLOW,
      COLOR_BLACK,
      COLOR_BLACK,
      COLOR_YELLOW,
      COLOR_RED,
      COLOR_RED,
      COLOR_YELLOW
    ];

    for (var i = 0; i < this.segments.length; i++) {
      this.segments[i].color = colors[i%8];
    }
  }

  draw (context) {
    this.segments.forEach(function(snakeBit) {
      snakeBit.draw(context);
    });
  }

  assignBodyParts () {
    this.neck = this.segments[this.segments.length - 2];
    this.head = this.segments[this.segments.length - 1];
  }

  getNextPosition (directionRequest) {
    var nextPositionRequest = this.head.nextPosition(directionRequest);

    this.direction = this.neck.detectTurnOnSelf(
      nextPositionRequest,
      directionRequest,
      this.direction
    );
    this.nextPosition = this.head.nextPosition(this.direction);
  }

  detectSelfCollision () {
    this.segments.forEach(function(snakeBit, i) {
      if (i != this.segments.length - 1 &&
        this.nextPosition.x === snakeBit.x &&
        this.nextPosition.y === snakeBit.y
      ) {
        this.endGame = true
        return;
      }
    }.bind(this));
  }

  detectWallCollision (nextPosition, canvasDim) {
    if (nextPosition.x < canvasDim.xLeft ||
      nextPosition.x >= canvasDim.xRight ||
      nextPosition.y < canvasDim.yTop ||
      nextPosition.y >= canvasDim.yBottom
    ) {
      this.endGame = true;
    }
  }

  detectFoodCollision (nextPosition, cellSize, canvasDim) {
    if (this.meal.x === this.nextPosition.x &&
      this.meal.y === this.nextPosition.y) {
      this.hasEaten = true;
      this.meal = new Food({
        width: cellSize,
        height: cellSize,
        color: 'rgba(100, 325, 100, 200)',
        canvasDim
      });
    }
  }

  move () {
    if (this.hasEaten) {
      this.hasEaten = false;
    } else {
      this.segments.shift();  //remove first object in array (tail)
    }
    var newSeg = new Segment({width: this.head.width, height: this.head.height})

    newSeg.x = this.nextPosition.x;
    newSeg.y = this.nextPosition.y;

    this.segments.push(newSeg);
  }

}

module.exports = Snake;
