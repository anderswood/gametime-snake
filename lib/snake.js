var Segment = require('./Segment.js');

function  Snake () {
  this.segments = [];
  this.tail = {};
  this.neck = {};
  this.head = {};
  // this.nextPositionRequest;
  this.direction = 'right';
  // this.nextPosition;

}


// eventually make it to a loop to avoid hard coding 4 segments
Snake.prototype.buildSnake = function(cellSize){
  // pushing segments into sanke[]
  var segment1 = new Segment({x:60, y:30, width: cellSize, height: cellSize, color:'rgba(100, 325, 100, 200)'})
  var segment2 = new Segment({x:70, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 100, 200)'})
  var segment3 = new Segment({x:80, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 300, 250)'})
  var segment4 = new Segment({x:90, y:30, width: cellSize, height: cellSize, color:'rgba(150, 225, 200, 30)'})
  this.segments = [segment1,segment2,segment3,segment4];
  // this.segments.colorize();
};

Snake.prototype.draw = function (context) {
  this.segments.forEach(function(snakeBit) {
    snakeBit.draw(context);
  });
}

Snake.prototype.assignBodyParts = function(){
  this.tail = this.segments[0];
  this.neck = this.segments[this.segments.length - 2];
  this.head = this.segments[this.segments.length - 1];
  this.head.endGame = false;
}

Snake.prototype.move = function (directionRequest) {
  this.nextPositionRequest = this.head.nextPosition(directionRequest);
  this.direction = this.neck.detectTurnOnSelf(this.nextPositionRequest, directionRequest, this.direction);
  this.nextPosition = this.head.nextPosition(this.direction);
  this.segments.shift();  //remove first object in array (tail)
  this.tail.x = this.nextPosition.x;
  this.tail.y = this.nextPosition.y;
  this.segments.push(this.tail);  //insert tail into head position
}



Snake.prototype.eat = function () {

}



module.exports = Snake;
