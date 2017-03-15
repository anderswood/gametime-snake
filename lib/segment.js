function Segment (options) {
  this.x = options.x || 100;
  this.y = options.y || 100;
  this.width = options.width;
  this.height = options.height;
  this.color = options.color;
}

Segment.prototype.draw = function (context) {
  context.fillStyle = 'red';
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

 Segment.prototype.move = function (direction) {
   this.x += direction.x;
   this.y += direction.y;

   return this;
};

module.exports = Segment;
