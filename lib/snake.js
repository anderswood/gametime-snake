var Segment = require('./Segment.js');
var Food = require('./food.js');

function  Snake () {
  this.segments = [];
  this.tail = {};
  this.neck = {};
  this.head = {};
  this.direction = 'right';
  this.nextPositionRequest;
  this.nextPosition;
  this.hasEaten = false;
}


// eventually make it to a loop to avoid hard coding 4 segments
Snake.prototype.buildSnake = function(initialLength, cellSize){
  for (var i = 0; i < initialLength; i++) {
    var xPosition = 0;
    this.segments.push(new Segment({x:xPosition, y:30, width: cellSize, height: cellSize, color:''}))
    xPosition += cellSize;
  }

  // var segment1 = new Segment({x:60, y:30, width: cellSize, height: cellSize, color:'rgba(100, 325, 100, 200)'})
  // var segment2 = new Segment({x:70, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 100, 200)'})
  // var segment3 = new Segment({x:80, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 300, 250)'})
  // var segment4 = new Segment({x:90, y:30, width: cellSize, height: cellSize, color:'rgba(150, 225, 200, 30)'})
  // this.segments = [segment1,segment2,segment3,segment4];
};

Snake.prototype.colorize = function () {
  var colors = ['#000000','#F9FD40','#000000','#000000','#F9FD40','#B12527','#B12527','#F9FD40']
  for (var i = 0; i < this.segments.length; i++) {
    (this.segments.length >= 8) ? this.segments[i].color = colors[i%8]: this.segments[i].color = colors[i];
  }
}

Snake.prototype.draw = function (context) {
  this.segments.forEach(function(snakeBit) {
    snakeBit.draw(context);
  });
}

Snake.prototype.assignBodyParts = function(){
  // this.tail = this.segments[0];
  this.neck = this.segments[this.segments.length - 2];
  this.head = this.segments[this.segments.length - 1];
  this.head.endGame = false;
}

Snake.prototype.move = function (directionRequest, cellSize, canvasDim) {
  this.nextPositionRequest = this.head.nextPosition(directionRequest);
  this.direction = this.neck.detectTurnOnSelf(this.nextPositionRequest, directionRequest, this.direction);
  this.nextPosition = this.head.nextPosition(this.direction);
  if (this.hasEaten === true) {
    this.meal = new Food({width: cellSize, height: cellSize, color:'rgba(100, 325, 100, 200)', canvasDim})
    //check that new food doesn't appear on snake body
    this.hasEaten = false;
  } else {
    this.segments.shift();  //remove first object in array (tail)
  }
  var newSeg = new Segment({width: this.head.width, height: this.head.height})
  newSeg.x = this.nextPosition.x;
  newSeg.y = this.nextPosition.y;
  this.segments.push(newSeg);  //insert tail into head position
}



Snake.prototype.eat = function () {

}



module.exports = Snake;
