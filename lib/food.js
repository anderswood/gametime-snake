function Food (options) {
  // this.x = options.x;
  // this.y = options.y;
  var canvasWidth = options.canvasDim.xRight - options.canvasDim.xLeft;
  var canvasHeight = options.canvasDim.yBottom - options.canvasDim.yTop;
  this.x = Math.floor(Math.random()*canvasWidth/options.width) * options.width;
  this.y = Math.floor(Math.random()* canvasHeight/options.height) * options.height;
  this.width = options.width;
  this.height = options.height;
  this.color = options.color;
}

Food.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Food.prototype.detectFoodCollision = function (nextPosition) {
  if (this.x === nextPosition.x && this.y === nextPosition.y) {
    console.log('get in ma belly!!');
  }
}

module.exports = Food;
