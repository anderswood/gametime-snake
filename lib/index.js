var Block = require('./Block.js');
var Food = require('./food.js');
var Snake = require('./snake.js');


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width:10, height:10, color:'rgba(100, 25, 100, 100)'})
var snakeSegment1 = new Snake({x:65, y:35, width:10, height:10, color:'rgba(100, 325, 100, 200)'})
var snakeSegment2 = new Snake({x:75, y:35, width:10, height:10, color:'rgba(50, 25, 100, 200)'})
var snakeSegment3 = new Snake({x:85, y:35, width:10, height:10, color:'rgba(50, 25, 300, 250)'})
var snakeSegment4 = new Snake({x:95, y:35, width:10, height:10, color:'rgba(150, 225, 200, 30)'})
var snakeArray = [snakeSegment1,snakeSegment2,snakeSegment3,snakeSegment4];

// var firstBlock = new Block(50, 50, 10, 10,'rgba(100, 25, 100, 100)');
// var secondBlock = new Block(75, 75, 10, 10,'rgba(0, 255, 0, 1)');
// var blocks = [
//   firstBlock,
//   secondBlock
// ];

// console.log(firstBlock.move);  // 50
// console.log(secondBlock.x); // 75


requestAnimationFrame(function gameLoop () {

    context.clearRect(0, 0, canvas.width, canvas.height);

    // blocks.forEach(function(block){
    //   block
    //     .move({x: 3, y: 0})
    //     .draw(context);
    // })

    snakeArray.forEach(function(snakeBit) {
      snakeBit.draw(context).move({x: 2, y: 0});

    })

    food.draw(context);

  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('click', function (e) {
  console.log('x: ', e.offsetX, 'y: ', e.offsetY);
  var x = e.offsetX;
  var y = e.offsetY;
  var newBlock = new Block(x, y, 10, 10,'rgba(0, 255, 120, 100)');
  blocks.push(newBlock);
});
