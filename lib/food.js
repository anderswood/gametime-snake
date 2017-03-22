
function Food (options) {
  // pullout --> dims = options.canvasDim

  var canvasWidth = options.canvasDim.xRight - options.canvasDim.xLeft;
  var canvasHeight = options.canvasDim.yBottom - options.canvasDim.yTop;

  // generate random food location
  this.x = Math.floor(Math.random() * canvasWidth  / options.width ) * options.width;
  this.y = Math.floor(Math.random() * canvasHeight / options.height) * options.height;

  this.width = options.width;
  this.height = options.height;
  this.color = options.color;
}

Food.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

// would be nice if this was in Snake.js
Food.prototype.detectFoodCollision = function (nextPosition, cellSize, canvasDim) {
  if (this.x === nextPosition.x && this.y === nextPosition.y) {
    console.log('get in ma belly!!');
    food.destroy();
    this.segments.unshift(new Segment({x, y}))
    // snake.hasEaten = true;
    // snake.meal = new Food({
    //   width: cellSize,
    //   height: cellSize,
    //   color: 'rgba(100, 325, 100, 200)',
    //   canvasDim
    // });
    //check that new food doesn't appear on snake body
  }
}

module.exports = Food;
