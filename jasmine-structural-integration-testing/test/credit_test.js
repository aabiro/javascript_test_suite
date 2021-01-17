var assert = require('assert');
var fn = require("../app/credit")

describe('credittStatus Structural test suite', function() {
  describe('Statement coverage', function() {
    beforeEach(function () {
      client_1 = { creditScore: -10 }; 
      client_2 = { creditScore: 55 }; 
      client_3 = { creditScore: 55 }; 
      client_4 = { creditScore: 10 }; 
      mode_strict = "strict"
      mode_default = "default"
    });
    
    it('Statement coverage creditScore = -10', function() {
      assert.equal(fn.module.creditStatus(client_1, mode_strict),"invalid");
    });
    it('Statement coverage creditcheckmode  = strict', function() {
      assert.equal(fn.module.creditStatus(client_2, mode_strict),"good");
    });
    it('Statement coverage creditcheckmode  = default', function() {
      assert.equal(fn.module.creditStatus(client_3, mode_default),"adverse");
    });
    it('Statement coverage creditScore = 10', function() {
      assert.equal(fn.module.creditStatus(client_4, mode_strict),"adverse");
    });
  });
  describe('Branch coverage', function() {
    // covered by statement coverage
  });
  describe('Path coverage', function() {
    beforeEach(function () {
      client_1 = { creditScore: 90 }; 
      client_2 = { creditScore: 1000 };
      client_3 = { creditScore: 10 }; 
      mode_default = "default"
      mode_strict = "strict"
    });
    
    it('Path coverage AB', function() {
      assert.equal(fn.module.creditStatus(client_2, mode_strict),"invalid");
    });
    it('Path coverage ACDGH', function() {
      assert.equal(fn.module.creditStatus(client_3, mode_strict),"adverse");
    });
    it('Path coverage ACDGI', function() {
      assert.equal(fn.module.creditStatus(client_1, mode_strict),"good");
    });
    it('Path coverage ACEFGH', function() {
      assert.equal(fn.module.creditStatus(client_1, mode_default),"good");
    });
    it('Path coverage ACEFGI', function() {
      assert.equal(fn.module.creditStatus(client_3, mode_default),"adverse");
    });
  });
});