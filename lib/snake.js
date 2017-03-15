function Snake (options) {
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.color = options.color;
}

Snake.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

// Snake.prototype.move = function (direction) {
//  this.x += direction.x;
//  this.y += direction.y;
//
// }

// Snake.prototype.moveAlong = function (direction) {
//   this.x += direction.x;
//   this.y += direction.y;
// }

module.exports = Snake