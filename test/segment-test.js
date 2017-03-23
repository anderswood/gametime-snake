
var chai = require('chai');
var assert = chai.assert;
var Segment = require ('../lib/Segment.js');
var Snake = require ('../lib/snake.js');


describe('segment', function() {
  var segment = new Segment ({width: 10, height: 10});
  var snake = new Snake (15, 10);

  it('should be an object', function() {
    assert.equal(typeof segment, 'object');
  });


  it('should indicate the next position of the snake', function() {
    // Feed
    segment.x = 25;
    segment.y = 25;
    // actual out
    var nextPosition = segment.nextPosition('right');

    // what the actual out is expected to be
    var expected = {'x': 35, 'y': 25};

    // compare the value of the acual out, to the expected out
    assert.equal(nextPosition.x, expected.x);
    assert.equal(nextPosition.y, expected.y);
  });

  it('should avoid contact with thy self', function() {
    var nextPositionRequest = {x: 10, y: 30};

    nextPositionRequest.x = segment.x;
    nextPositionRequest.y = segment.y;
    var direction = 'right';

    segment.detectTurnOnSelf(nextPositionRequest, 'left', direction);
    assert.equal(snake.neck, direction);
  });


});
