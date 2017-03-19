

function Segment (options) {
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.color = options.color;
}

// Segment.prototype.colorize = function () {
//
// }

Segment.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Segment.prototype.position = function () {
  var position = {'x':this.x,'y':this.y}
  return position
}

Segment.prototype.nextPosition = function (dx) {
  var nextPosition = ''
  switch (dx) {
    case 'left': nextPosition = {'x':this.x-this.width,'y':this.y}; break;
    case 'up': nextPosition = {'x':this.x,'y':this.y-this.height}; break;
    case 'right': nextPosition = {'x':this.x+this.width,'y':this.y}; break;
    case 'down': nextPosition = {'x':this.x,'y':this.y+this.height}; break;
}
  return nextPosition;
};

Segment.prototype.detectTurnOnSelf = function (nextPositionRequest, directionRequest, direction) {
  if (this.x === nextPositionRequest.x && this.y === nextPositionRequest.y) {
    return direction //directionRequest rejected
  } else {
    return directionRequest; // directionRequest accepted
  }
}

Segment.prototype.detectWallCollision = function(nextPosition, canvasDim){
  if(nextPosition.x < canvasDim.xLeft || nextPosition.x >= canvasDim.xRight || nextPosition.y < canvasDim.yTop || nextPosition.y >= canvasDim.yBottom){
    console.log('death looks so pretty on you');
    this.endGame = true;
  }
};




module.exports = Segment;
