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


module.exports = Segment;
