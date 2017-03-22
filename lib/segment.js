
class Segment {
  constructor (options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  position () {
    var position = {'x': this.x, 'y': this.y}

    return position
  }

  nextPosition (dx) {
    var nextPosition = ''

    switch (dx) {
    case 'left': nextPosition = {'x': this.x-this.width, 'y': this.y}; break;
    case 'up': nextPosition = {'x': this.x, 'y': this.y-this.height}; break;
    case 'right': nextPosition = {'x': this.x+this.width, 'y': this.y}; break;
    case 'down': nextPosition = {'x': this.x, 'y': this.y+this.height}; break;
    }
    return nextPosition;
  }

  detectTurnOnSelf (nextPositionRequest, directionRequest, direction) {
    if (this.x === nextPositionRequest.x && this.y === nextPositionRequest.y) {
      return direction //directionRequest rejected
    } else {
      return directionRequest; // directionRequest accepted
    }
  }

  }


module.exports = Segment;
