var Block = require('./Block.js');
var Food = require('./food.js');
var Segment = require('./segment.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width:10, height:10, color:'rgba(100, 25, 100, 100)'});
var segment1 = new Segment({width:10, height:10});
var segment2 = new Segment({width:10, height:10});
var segment3 = new Segment({width:10, height:10});
var segment4 = new Segment({width:10, height:10});
var snake = [];





requestAnimationFrame(function gameLoop () {

    context.clearRect(0, 0, canvas.width, canvas.height);

    // blocks.forEach(function(block){
    //   block
    //     .move({x: 3, y: 0})
    //     .draw(context);
    // })
    food.draw(context);
    segment.draw(context);
    segment.move({x:3, y: 0});
    snake.push(newSegment)


  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('click', function (e) {
  console.log('x: ', e.offsetX, 'y: ', e.offsetY);
  var x = e.offsetX;
  var y = e.offsetY;
  var newBlock = new Block(x, y, 10, 10,'rgba(0, 255, 120, 100)');
  blocks.push(newBlock);
});
