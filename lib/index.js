var Snake = require('./Snake.js');

var cellSize = 10;

var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');
var foodCrumb;
var score = document.querySelector('#active-score')

var directionRequest = 'right';
var initialLength = 15;
var snake;

var newGameBtn1 = document.getElementById('new-game-button1');
var newGameBtn2 = document.getElementById('new-game-button2');
var newGameBox = document.getElementById('new-game-box');
var endGameBox = document.getElementById('end-game-box');

endGameBox.style.display = 'none';


function startGame () {
  snake = new Snake (initialLength, cellSize);
  breatheLife();
}

function breatheLife () {

  snake.moveRequest(directionRequest, cellSize)

  if (snake.endGame) {
    gameOver();
    return
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  snake.draw(context);
  foodCrumb = snake.meal;
  foodCrumb.draw(context);
  score.innerText = snake.segments.length;

  setTimeout(breatheLife, 100);
}

function gameOver() {
  endGameBox.style.display = '';
}

document.addEventListener('keydown', function(e) {
  var keys = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};

  if (keys[e.keyCode]) {
    directionRequest = keys[e.keyCode];
  }
});

newGameBtn1.addEventListener('click', function() {
  directionRequest = 'right'
  startGame()
  newGameBox.style.display = 'none';
});

newGameBtn2.addEventListener('click', function() {
  directionRequest = 'right'
  startGame()
  endGameBox.style.display = 'none';
});
