var assert = require('assert');
var fn = require("../app/age")

describe('getAgeFActor Structural test suite', function() {
  describe('Statement coverage', function() {
    beforeEach(function () {
        client_1 = { age: 10 };
        client_2 = { age: 15 };
        client_3 = { age: 25 };
        client_4 = { age: 35 };
        client_5 = { age: 55 };
        client_6 = { age: 100 };
    });
    
    it('Statement coverage age=8', function() {
      assert.equal(fn.module.getAgeFactor(client_1),0);
    });
    it('Statement coverage age=10', function() {
      assert.equal(fn.module.getAgeFactor(client_2),5);
    });
    it('Statement coverage age=25', function() {
      assert.equal(fn.module.getAgeFactor(client_3),10);
    });
    it('Statement coverage age=35', function() {
      assert.equal(fn.module.getAgeFactor(client_4),20);
    });
    it('Statement coverage age=55', function() {
      assert.equal(fn.module.getAgeFactor(client_5),50);
    });
    it('Statement coverage age=100', function() {
      assert.equal(fn.module.getAgeFactor(client_6),20);
    });
  });
  describe('Branch coverage', function() {
    // covered by statement coverage
  });
  describe('Path coverage', function() {
    beforeEach(function () {
      client_1 = { age: 150 };
    });
    
    it('Path coverage AB', function() {
      assert.equal(fn.module.getAgeFactor(client_1),0);
    });
  });
});