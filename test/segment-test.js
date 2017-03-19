
var chai = require('chai')
var assert = chai.assert
var Segment = require ('../lib/segment.js')


describe('segment', function(){

it('should indicate the next position of the snake', function(){
  var segment = new Segment ({});
  // Feed
  segment.x = 25;
  segment.y = 25;
  // actual out
  var nextPosition = segment.nextPosition('right', 10);
  // what the actual out is expected to be
  var expected = {'x':35,'y':25};
  // compare the value of the acual out, to the expected out
  assert.equal(nextPosition.x, expected.x);
  assert.equal(nextPosition.y, expected.y);
});
});
