
var randomCoords;

class Food {
  constructor (options) {
    this.x = this.generateRandomCoords(options).x
    this.y = this.generateRandomCoords(options).y
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
  }

  generateRandomCoords (options) {
    var canvasWidth = options.canvasDim.xRight - options.canvasDim.xLeft;
    var canvasHeight = options.canvasDim.yBottom - options.canvasDim.yTop;

    randomCoords = {'x': '', 'y': ''}
    randomCoords.x = Math.floor(Math.random() * canvasWidth/options.width) * options.width;
    randomCoords.y = Math.floor(Math.random() * canvasHeight/options.height) * options.height;
    return randomCoords
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

}


module.exports = Food
