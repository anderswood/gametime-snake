var Block = require('./Block.js');
var Food = require('./food.js');
<<<<<<< HEAD
var Segment = require('./segment.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width:10, height:10, color:'rgba(100, 25, 100, 100)'});
var segment1 = new Segment({width:10, height:10});
var segment2 = new Segment({width:10, height:10});
var segment3 = new Segment({width:10, height:10});
var segment4 = new Segment({width:10, height:10});
var snake = [];

=======
var Snake = require('./snake.js');


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width:10, height:10, color:'rgba(100, 25, 100, 100)'})
var snakeSegment1 = new Snake({x:65, y:35, width:10, height:10, color:'rgba(100, 325, 100, 200)'})
var snakeSegment2 = new Snake({x:75, y:35, width:10, height:10, color:'rgba(50, 25, 100, 200)'})
var snakeSegment3 = new Snake({x:85, y:35, width:10, height:10, color:'rgba(50, 25, 300, 250)'})
var snakeSegment4 = new Snake({x:95, y:35, width:10, height:10, color:'rgba(150, 225, 200, 30)'})
var snakeArray = [snakeSegment1,snakeSegment2,snakeSegment3,snakeSegment4];
>>>>>>> b882250b2053011b8995e4bcdd5e6435dddf8b41




requestAnimationFrame(function gameLoop () {

  

    context.clearRect(0, 0, canvas.width, canvas.height);

    // blocks.forEach(function(block){
    //   block
    //     .move({x: 3, y: 0})
    //     .draw(context);
    // })
<<<<<<< HEAD
=======


    var tail = snakeArray.shift();  //remove first object in array (tail)
    tail.x = snakeArray[snakeArray.length - 1].x + 10; //update tail position
    snakeArray.push(tail); //insert tail into head position

    snakeArray.forEach(function(snakeBit) {
      snakeBit.draw(context);
    })

>>>>>>> b882250b2053011b8995e4bcdd5e6435dddf8b41
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
