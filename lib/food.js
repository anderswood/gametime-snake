
class Food {
  constructor (options) {
    var canvasWidth = options.canvasDim.xRight - options.canvasDim.xLeft;
    var canvasHeight = options.canvasDim.yBottom - options.canvasDim.yTop;

    this.x = Math.floor(Math.random() * canvasWidth/options.width) * options.width;
    this.y = Math.floor(Math.random() * canvasHeight/options.height) * options.height;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
  }

  draw (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

}


module.exports = Food
