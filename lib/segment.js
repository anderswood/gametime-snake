

function Segment (options) {
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.color = options.color;
}

Segment.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Segment.prototype.position = function () {
  var position = {'x':this.x,'y':this.y}
  return position
}

Segment.prototype.nextPosition = function (directionRequest, cellSize) {
  var nextPosition = ''
  if (directionRequest === 'left') {
    nextPosition = {'x':this.x-cellSize,'y':this.y}
  } else if (directionRequest === 'up') {
    nextPosition = {'x':this.x,'y':this.y-cellSize}
  } else if (directionRequest === 'right') {
    nextPosition = {'x':this.x+cellSize,'y':this.y}
  } else if (directionRequest === 'down') {
    nextPosition = {'x':this.x,'y':this.y+cellSize}
  }

  return nextPosition;
};

Segment.prototype.detectWallCollision = function(nextPosition, canvasDim){
  if(nextPosition.x < canvasDim.xLeft || nextPosition.x >= canvasDim.xRight || nextPosition.y < canvasDim.yTop || nextPosition.y >= canvasDim.yBottom){
    console.log('death looks so pretty on you');
  }
};



module.exports = Segment;
