var chai = require('chai')
var assert = chai.assert
var Snake = require ('../lib/snake.js')
var Segment = require('../lib/Segment.js');


describe('snake', function(){
  var cellSize = 10;
  var initialLength = 5;
  var snake = new Snake(cellSize, initialLength);

  snake.buildSnake(initialLength, cellSize);

  it('should be an object', function(){
    assert.equal(typeof snake, 'object');
  });

  it('should have properties of direction, nextPositionRequest, nextPosition and hasEaten that are equal "right", "", "", false', function(){
    assert.equal(snake.direction, 'right');
    assert.equal(snake.nextPositionRequest, undefined);
    assert.equal(snake.nextPosition, undefined);
    assert.equal(snake.hasEaten, false);
  });

  it('should build a snake based on initialLength', function(){
    assert.equal(snake.segments.length, 5);
  });

  it('should push a new segment into the segments array where the width and height are equal to cellSize', function(){
    assert.equal(snake.segments[0].height, cellSize);
    assert.equal(snake.segments[0].width, cellSize);
  });

  it('the second color should be "#F9FD40"', function(){
    snake.colorize();
    assert.equal(snake.segments[1].color, "#F9FD40")
  });

  // Draw...feature testing? --Don't do it!

  it('should place the neck at the second index and the head should be at the first index', function(){
    var expectedX = snake.segments[snake.segments.length-1].x

    snake.assignBodyParts();
    assert.equal(snake.neck.x, expectedX)
  });

  it('should genereate the x & y position for the next head position', function(){
    var directionRequest = 'right';
    var expectedNewPos = snake.segments[snake.segments.length - 1] = {x: 10; y: 10};
    snake.head = {x}
    snake.getNextPosition();
    // var expectedX = snake.segments[snake.segments.length-1].x
    assert.equal(snake.nextPosiiton.x, expectedX)
  });

  it('should instantiate the head with an endGame property defaulting to false', function() {
    assert.equal(snake.endGame, false)
  });

  it('should make a new segment and place in the direction of snake movement', function() {
    var snake = new Snake()
    var directionRequest = 'left';
    var cellSize = 10;
    var canvasDim = 300;

    var newSeg = new Segment({width: 10, height: 10})
    // var newSeg = new Segment({width: 10, height: 10})

    // move x and y into Segment constructor function
    newSeg.x = 10;
    newSeg.y = 10;

    var expectedNewSeg = new Segment({width: 10, height: 10})
    expectedNewSeg.x = 20;
    expectedNewSeg.y = 10;

    // expectedNewSeg.endGame = false;
    snake.head = newSeg;
    snake.move('right', 10, 300);
    assert.equal(snake.head, expectedNewSeg)
  });

  it('snake should grow when it eats food', function() {
    var snake = new Snake();

    snake.segments = new Segment(10,10);
    snake.nextPosition.x = 10;
    snake.nextPosition.y = 10 ;

    snake.detectSelfCollision();
    assert.equal(snake.endGame, true);
  });

  it('should detect when the snake hits a wall', function() {
    var snake = new Snake();

    snake.segments = new Segment(10,10);
    snake.nextPosition.x = 10;
    snake.nextPosition.y = 10 ;

    snake.detectSelfCollision();
    assert.equal(snake.endGame, true);
  });

  it('should detect when a segment enters the coordiantes of another segment', function() {
      var snake = new Snake();

      snake.segments = new Segment(10,10);
      snake.nextPosition.x = 10;
      snake.nextPosition.y = 10 ;

      snake.detectSelfCollision();
      assert.equal(snake.endGame, true);
  });

  it('should detect for endgame -- could combine with previous', function() {
  })

    // establish the coordinates of two snake segments
    // call function
    // created expected coordinates of the new position of snake segments that intersect
    //



});
