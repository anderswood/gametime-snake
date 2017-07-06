/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(1);

	var cellSize = 10;

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var foodCrumb;
	var score = document.querySelector('#active-score');

	var directionRequest = 'right';
	var initialLength = 15;
	var snake;

	var newGameBtn1 = document.getElementById('new-game-button1');
	var newGameBtn2 = document.getElementById('new-game-button2');
	var newGameBox = document.getElementById('new-game-box');
	var endGameBox = document.getElementById('end-game-box');

	endGameBox.style.display = 'none';

	function startGame() {
	  snake = new Snake(initialLength, cellSize);
	  breatheLife();
	}

	function breatheLife() {

	  snake.moveRequest(directionRequest, cellSize);

	  if (snake.endGame) {
	    gameOver();
	    return;
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

	document.addEventListener('keydown', function (e) {
	  var keys = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

	  if (keys[e.keyCode]) {
	    directionRequest = keys[e.keyCode];
	  }
	});

	newGameBtn1.addEventListener('click', function () {
	  directionRequest = 'right';
	  startGame();
	  newGameBox.style.display = 'none';
	});

	newGameBtn2.addEventListener('click', function () {
	  directionRequest = 'right';
	  startGame();
	  endGameBox.style.display = 'none';
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Segment = __webpack_require__(2);
	var Food = __webpack_require__(3);

	const COLOR_BLACK = '#000000';
	const COLOR_YELLOW = '#F9FD40';
	const COLOR_RED = '#B12527';
	const COLOR_GREEN = '#64ff64';
	const canvasDim = { xLeft: 0, xRight: 300, yTop: 0, yBottom: 300 };

	class Snake {
	  constructor(initialLength, cellSize) {
	    this.segments = [];
	    this.neck = {};
	    this.head = {};
	    this.direction = 'right';
	    this.nextPosition;
	    this.meal = new Food({
	      width: cellSize,
	      height: cellSize,
	      color: COLOR_GREEN,
	      canvasDim });
	    this.hasEaten = false;
	    this.endGame = false;
	    this.buildSnake(initialLength, cellSize);
	  }

	  buildSnake(initialLength, cellSize) {
	    for (var i = 0; i < initialLength; i++) {

	      this.segments.push(new Segment({
	        x: 0,
	        y: 30,
	        width: cellSize,
	        height: cellSize,
	        color: ''
	      }));
	    }
	  }

	  draw(context) {
	    this.segments.forEach(function (snakeBit) {
	      snakeBit.draw(context);
	    });
	  }

	  moveRequest(directionRequest, cellSize) {
	    this.assignBodyParts();
	    this.getNextPosition(directionRequest);
	    this.detectSelfCollision();
	    this.detectWallCollision(this.nextPosition, canvasDim);
	    this.detectFoodCollision(this.nextPosition, cellSize, canvasDim);
	  }

	  assignBodyParts() {
	    this.neck = this.segments[this.segments.length - 2];
	    this.head = this.segments[this.segments.length - 1];
	  }

	  getNextPosition(directionRequest) {
	    var nextPositionRequest = this.head.nextPosition(directionRequest);

	    this.direction = this.neck.detectTurnOnSelf(nextPositionRequest, directionRequest, this.direction);
	    this.nextPosition = this.head.nextPosition(this.direction);
	  }

	  detectSelfCollision() {
	    this.segments.forEach(function (snakeBit, i) {
	      if (i != this.segments.length - 1 && this.nextPosition.x === snakeBit.x && this.nextPosition.y === snakeBit.y) {
	        this.endGame = true;
	        return;
	      }
	    }.bind(this));
	  }

	  detectWallCollision(nextPosition) {
	    if (nextPosition.x < canvasDim.xLeft || nextPosition.x >= canvasDim.xRight || nextPosition.y < canvasDim.yTop || nextPosition.y >= canvasDim.yBottom) {
	      this.endGame = true;
	    }
	  }

	  detectFoodCollision(nextPosition, cellSize) {
	    if (this.meal.x === this.nextPosition.x && this.meal.y === this.nextPosition.y) {
	      this.hasEaten = true;
	      this.meal = new Food({
	        width: cellSize,
	        height: cellSize,
	        color: COLOR_GREEN,
	        canvasDim
	      });
	    }
	  }

	  move() {
	    if (this.hasEaten) {
	      this.hasEaten = false;
	    } else {
	      this.segments.shift(); //remove first object in array (tail)
	    }
	    var newSeg = new Segment({
	      x: this.nextPosition.x,
	      y: this.nextPosition.y,
	      width: this.head.width,
	      height: this.head.height });

	    this.segments.push(newSeg);
	    this.colorize();
	  }

	  colorize() {
	    var colors = [COLOR_BLACK, COLOR_YELLOW, COLOR_BLACK, COLOR_BLACK, COLOR_YELLOW, COLOR_RED, COLOR_RED, COLOR_YELLOW];

	    for (var i = 0; i < this.segments.length; i++) {
	      this.segments[i].color = colors[i % 8];
	    }
	  }

	}

	module.exports = Snake;

/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class Segment {
	  constructor(options) {
	    this.x = options.x;
	    this.y = options.y;
	    this.width = options.width;
	    this.height = options.height;
	    this.color = options.color;
	  }

	  draw(context) {
	    context.fillStyle = this.color;
	    context.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }

	  position() {
	    var position = { 'x': this.x, 'y': this.y };

	    return position;
	  }

	  nextPosition(dx) {
	    var nextPosition = '';

	    switch (dx) {
	      case 'left':
	        nextPosition = { 'x': this.x - this.width, 'y': this.y };break;
	      case 'up':
	        nextPosition = { 'x': this.x, 'y': this.y - this.height };break;
	      case 'right':
	        nextPosition = { 'x': this.x + this.width, 'y': this.y };break;
	      case 'down':
	        nextPosition = { 'x': this.x, 'y': this.y + this.height };break;
	    }
	    return nextPosition;
	  }

	  detectTurnOnSelf(nextPositionRequest, directionRequest, direction) {
	    if (this.x === nextPositionRequest.x && this.y === nextPositionRequest.y) {
	      return direction; //directionRequest rejected
	    }
	    return directionRequest; // directionRequest accepted
	  }

	}

	module.exports = Segment;

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var randomCoords;

	class Food {
	  constructor(options) {
	    this.x = this.generateRandomCoords(options).x;
	    this.y = this.generateRandomCoords(options).y;
	    this.width = options.width;
	    this.height = options.height;
	    this.color = options.color;
	  }

	  generateRandomCoords(options) {
	    var canvasWidth = options.canvasDim.xRight - options.canvasDim.xLeft;
	    var canvasHeight = options.canvasDim.yBottom - options.canvasDim.yTop;

	    randomCoords = { 'x': '', 'y': '' };
	    randomCoords.x = Math.floor(Math.random() * canvasWidth / options.width) * options.width;
	    randomCoords.y = Math.floor(Math.random() * canvasHeight / options.height) * options.height;
	    return randomCoords;
	  }

	  draw(context) {
	    context.fillStyle = this.color;
	    context.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }

	}

	module.exports = Food;

/***/ }
/******/ ]);