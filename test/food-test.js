var chai = require('chai')
var assert = chai.assert;
// var Snake = require ('../lib/snake.js');
// var Segment = require('../lib/Segment.js');
var Food = require('../lib/food.js');


describe('food', function() {
  var canvasDim = {xLeft: 0, xRight: 300, yTop: 0, yBottom: 300};
  var food = new Food({width: 10, height: 10, color: 'rgba(100, 325, 100, 200)', canvasDim });

  it('should be an object', function() {
    assert.equal(typeof food, 'object');
  });

  it('should have properties of height, width, color', function() {
    assert.equal(food.height, 10);
    assert.equal(food.width, 10);
    assert.equal(food.color, 'rgba(100, 325, 100, 200)');
  });









});
