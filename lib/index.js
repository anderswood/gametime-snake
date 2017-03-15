var Block = require('./Block.js');
var Food = require('./food.js');
var Segment = require('./segment.js');


var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var food = new Food({width:10, height:10, color:'rgba(100, 25, 100, 100)'})
var segment1 = new Segment({x:65, y:35, width:10, height:10, color:'rgba(100, 325, 100, 200)'})
var segment2 = new Segment({x:75, y:35, width:10, height:10, color:'rgba(50, 25, 100, 200)'})
var segment3 = new Segment({x:85, y:35, width:10, height:10, color:'rgba(50, 25, 300, 250)'})
var segment4 = new Segment({x:95, y:35, width:10, height:10, color:'rgba(150, 225, 200, 30)'})
var snake = [segment1,segment2,segment3,segment4];

// var firstBlock = new Block(50, 50, 10, 10,'rgba(100, 25, 100, 100)');
// var secondBlock = new Block(75, 75, 10, 10,'rgba(0, 255, 0, 1)');
// var blocks = [
//   firstBlock,
//   secondBlock
// ];

// console.log(firstBlock.move);  // 50
// console.log(secondBlock.x); // 75
var counter = 0;

requestAnimationFrame(function gameLoop () {


   context.clearRect(0, 0, canvas.width, canvas.height);

   // blocks.forEach(function(block){
   //   block
   //     .move({x: 3, y: 0})
   //     .draw(context);
   // })

// adjust speed another way
   if (counter === 10) {
   var tail =  snake.shift();  //remove first object in array (tail)
   tail.x = snake[snake.length - 1].x + 10; //update tail position
   snake.push(tail); //insert tail into head position
   counter = 0
   }
   counter++

   snake.forEach(function(snakeBit) {
     snakeBit.draw(context);
   })

   food.draw(context);

 requestAnimationFrame(gameLoop);
});

var direction = 'right';


canvas.addEventListener('keydown', function(e){
  console.log(e.keyCode)
  if(e.keyCode === 37){
    direction = 'left';
    console.log(direction);
  }
});

canvas.addEventListener('click', function (e) {
 console.log('x: ', e.offsetX, 'y: ', e.offsetY);
 var x = e.offsetX;
 var y = e.offsetY;
 var newBlock = new Block(x, y, 10, 10,'rgba(0, 255, 120, 100)');
 blocks.push(newBlock);
});
