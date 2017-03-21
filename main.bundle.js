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

	var Food = __webpack_require__(1);
	var Segment = __webpack_require__(3);
	var Snake = __webpack_require__(2);

	var cellSize = 10;
	var canvasDim = { xLeft: 0, xRight: 300, yTop: 0, yBottom: 300 };
	var endGame = false;

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var foodCrumb = new Food({ width: cellSize, height: cellSize, color: 'rgba(100, 325, 100, 200)', canvasDim });
	var score = document.querySelector('#active-score');

	var directionRequest = 'right';

	startGame();

	function startGame() {
	  snake = new Snake(); //creates initial, empty snake object
	  initialLength = 10;
	  snake.buildSnake(initialLength, cellSize); //add 4 segments to snake array
	  snake.meal = foodCrumb;
	  breathLife();
	}

	function breathLife() {

	  context.clearRect(0, 0, canvas.width, canvas.height);
	  foodCrumb.draw(context);

	  snake.assignBodyParts();
	  snake.move(directionRequest, cellSize, canvasDim);
	  snake.colorize();
	  snake.draw(context);

	  snake.head.detectWallCollision(snake.nextPosition, canvasDim);
	  foodCrumb.detectFoodCollision(snake.nextPosition);
	  //  detectSelfCollision();
	  snake.detectSelfCollision();

	  foodCrumb = snake.meal;
	  score.innerText = snake.segments.length;

	  //include a "pauseGame" function?

	  //End game (stop animation) if endGame property === true
	  if (snake.head.endGame) {
	    //  explodeSnake();
	    console.log('GAMEOVER!');
	    return;
	  }

	  setTimeout(breathLife, 100);
	}

	document.addEventListener('keydown', function (e) {
	  var keys = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' };
	  if (keys[e.keyCode]) {
	    directionRequest = keys[e.keyCode];
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(2);

	function Food(options) {
	  var canvasWidth = options.canvasDim.xRight - options.canvasDim.xLeft;
	  var canvasHeight = options.canvasDim.yBottom - options.canvasDim.yTop;
	  this.x = Math.floor(Math.random() * canvasWidth / options.width) * options.width;
	  this.y = Math.floor(Math.random() * canvasHeight / options.height) * options.height;
	  this.width = options.width;
	  this.height = options.height;
	  this.color = options.color;
	}

	Food.prototype.draw = function (context) {
	  context.fillStyle = this.color;
	  context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Food.prototype.detectFoodCollision = function (nextPosition) {
	  if (this.x === nextPosition.x && this.y === nextPosition.y) {
	    console.log('get in ma belly!!');
	    snake.hasEaten = true;
	  }
	};

	module.exports = Food;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Segment = __webpack_require__(3);
	var Food = __webpack_require__(1);

	function Snake() {
	  this.segments = [];
	  this.tail = {};
	  this.neck = {};
	  this.head = {};
	  this.direction = 'right';
	  this.nextPositionRequest;
	  this.nextPosition;
	  this.hasEaten = false;
	}

	// eventually make it to a loop to avoid hard coding 4 segments
	Snake.prototype.buildSnake = function (initialLength, cellSize) {
	  for (var i = 0; i < initialLength; i++) {
	    var xPosition = 0;
	    this.segments.push(new Segment({ x: xPosition, y: 30, width: cellSize, height: cellSize, color: '' }));
	    xPosition += cellSize;
	  }

	  // var segment1 = new Segment({x:60, y:30, width: cellSize, height: cellSize, color:'rgba(100, 325, 100, 200)'})
	  // var segment2 = new Segment({x:70, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 100, 200)'})
	  // var segment3 = new Segment({x:80, y:30, width: cellSize, height: cellSize, color:'rgba(50, 25, 300, 250)'})
	  // var segment4 = new Segment({x:90, y:30, width: cellSize, height: cellSize, color:'rgba(150, 225, 200, 30)'})
	  // this.segments = [segment1,segment2,segment3,segment4];
	};

	Snake.prototype.colorize = function () {
	  var colors = ['#000000', '#F9FD40', '#000000', '#000000', '#F9FD40', '#B12527', '#B12527', '#F9FD40'];
	  for (var i = 0; i < this.segments.length; i++) {
	    this.segments.length >= 8 ? this.segments[i].color = colors[i % 8] : this.segments[i].color = colors[i];
	  }
	};

	Snake.prototype.draw = function (context) {
	  this.segments.forEach(function (snakeBit) {
	    snakeBit.draw(context);
	  });
	};

	Snake.prototype.assignBodyParts = function () {
	  this.neck = this.segments[this.segments.length - 2];
	  this.head = this.segments[this.segments.length - 1];
	  this.head.endGame = false;
	};

	Snake.prototype.move = function (directionRequest, cellSize, canvasDim) {
	  this.nextPositionRequest = this.head.nextPosition(directionRequest);
	  this.direction = this.neck.detectTurnOnSelf(this.nextPositionRequest, directionRequest, this.direction);
	  this.nextPosition = this.head.nextPosition(this.direction);
	  //need to separate this out into at least two function: checkNextPosition and move
	  if (this.hasEaten === true) {
	    this.meal = new Food({ width: cellSize, height: cellSize, color: 'rgba(100, 325, 100, 200)', canvasDim });

	    // this.meal = new Food({width: cellSize, height: cellSize, color:'rgba(100, 325, 100, 200)', canvasDim})

	    //check that new food doesn't appear on snake body
	    this.hasEaten = false;
	  } else {
	    this.segments.shift(); //remove first object in array (tail)
	  }
	  var newSeg = new Segment({ width: this.head.width, height: this.head.height });
	  newSeg.x = this.nextPosition.x;
	  newSeg.y = this.nextPosition.y;
	  this.segments.push(newSeg);
	  this.assignBodyParts(); //important for detectSelfCollision to work, maybe move to elsewhere or reorder functions in the breathlife function
	};

	Snake.prototype.detectSelfCollision = function () {
	  this.segments.forEach(function (snakeBit, i) {
	    if (i != snake.segments.length - 1 && snake.head.x === snakeBit.x && snake.head.y === snakeBit.y) {
	      console.log('GAMEOVER, dont hit yourself');
	      this.endGame = true;
	      return;
	    }
	  });
	};

	Snake.prototype.eat = function () {};

	module.exports = Snake;

/***/ },
/* 3 */
/***/ function(module, exports) {

	

	function Segment(options) {
	  this.x = options.x;
	  this.y = options.y;
	  this.width = options.width;
	  this.height = options.height;
	  this.color = options.color;
	}

	// Segment.prototype.colorize = function () {
	//
	// }

	Segment.prototype.draw = function (context) {
	  context.fillStyle = this.color;
	  context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Segment.prototype.position = function () {
	  var position = { 'x': this.x, 'y': this.y };
	  return position;
	};

	Segment.prototype.nextPosition = function (dx) {
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
	};

	Segment.prototype.detectTurnOnSelf = function (nextPositionRequest, directionRequest, direction) {
	  if (this.x === nextPositionRequest.x && this.y === nextPositionRequest.y) {
	    return direction; //directionRequest rejected
	  } else {
	    return directionRequest; // directionRequest accepted
	  }
	};

	Segment.prototype.detectWallCollision = function (nextPosition, canvasDim) {
	  if (nextPosition.x < canvasDim.xLeft || nextPosition.x >= canvasDim.xRight || nextPosition.y < canvasDim.yTop || nextPosition.y >= canvasDim.yBottom) {
	    console.log('death looks so pretty on you');
	    this.endGame = true;
	  }
	};

	module.exports = Segment;

/***/ }
/******/ ]);