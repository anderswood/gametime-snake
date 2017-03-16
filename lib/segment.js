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

Segment.prototype.nextPosition = function (directionRequest) {
  var nextPosition = ''
  if (directionRequest === 'left') {
    nextPosition = {'x':this.x-10,'y':this.y}
  } else if (directionRequest === 'up') {
    nextPosition = {'x':this.x,'y':this.y-10}
  } else if (directionRequest === 'right') {
    nextPosition = {'x':this.x+10,'y':this.y}
  } else if (directionRequest === 'down') {
    nextPosition = {'x':this.x,'y':this.y+10}
  }

  return nextPosition
}



module.exports = Segment;