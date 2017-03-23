var Segment = require('./segment.js');
var Food = require('./food.js');

const COLOR_BLACK = '#000000';
const COLOR_YELLOW = '#F9FD40';
const COLOR_RED = '#B12527';
const COLOR_GREEN = '#64ff64';
const canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};

class Snake {
  constructor (initialLength, cellSize) {
    this.segments = [];
    this.neck = {};
    this.head = {};
    this.direction = 'right';
    this.nextPosition;
    this.meal = new Food({
      width: cellSize,
      height: cellSize,
      color: COLOR_GREEN,
      canvasDim});
    this.hasEaten = false;
    this.endGame = false;
    this.buildSnake (initialLength, cellSize);
  }


  buildSnake (initialLength, cellSize) {
    for (var i = 0; i < initialLength; i++) {

      this.segments.push(new Segment({
        x: 0,
        y: 30,
        width: cellSize,
        height: cellSize,
        color: ''
      }))
    }
  }

  draw (context) {
    this.segments.forEach(function(snakeBit) {
      snakeBit.draw(context);
    });
  }

  moveRequest(directionRequest, cellSize) {
    this.assignBodyParts();
    this.getNextPosition(directionRequest);
    this.detectSelfCollision();
    this.detectWallCollision(this.nextPosition, canvasDim);
    this.detectFoodCollision(this.nextPosition, cellSize, canvasDim);
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

  detectWallCollision (nextPosition) {
    if (nextPosition.x < canvasDim.xLeft ||
      nextPosition.x >= canvasDim.xRight ||
      nextPosition.y < canvasDim.yTop ||
      nextPosition.y >= canvasDim.yBottom
    ) {
      this.endGame = true;
    }
  }

  detectFoodCollision (nextPosition, cellSize) {
    if (this.meal.x === this.nextPosition.x &&
      this.meal.y === this.nextPosition.y) {
      this.hasEaten = true;
      this.meal = new Food({
        width: cellSize,
        height: cellSize,
        color: COLOR_GREEN,
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
    this.colorize();
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

}

module.exports = Snake;
