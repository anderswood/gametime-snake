function Food (options) {
  // this.x = options.x;
  // this.y = options.y;
  this.x = Math.floor(Math.random()*300);
  this.y = Math.floor(Math.random()*300);
  this.width = options.width;
  this.height = options.height;
  this.color = options.color;
}

Food.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

module.exports = Food
