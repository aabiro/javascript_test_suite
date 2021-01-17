var assert = require('assert');
var fn = require("../app/balance")

describe('getBalanceFactor Structural test suite', function() {
  describe('Statement coverage', function() {
    beforeEach(function () {
      client_1 = { balance: 0 };
      client_2 = { balance: 50 };
      client_3 = { balance: 250 };
      client_4 = { balance: 600 };
      client_5 = { balance: 1500 };
      client_6 = { balance: 3500 };
    });

    it('Statement coverage balance=0', function() {
      assert.equal(fn.module.getBalanceFactor(client_1),0);
    });
    it('Statement coverage balance=50', function() {
      assert.equal(fn.module.getBalanceFactor(client_2),6);
    });
    it('Statement coverage balance=250', function() {
      assert.equal(fn.module.getBalanceFactor(client_3),16);
    });
    it('Statement coverage balance=600', function() {
     assert.equal(fn.module.getBalanceFactor(client_4),30);
    });
    it('Statement coverage balance=1500', function() {
      assert.equal(fn.module.getBalanceFactor(client_5),70);
    });
    it('Statement coverage balance=3500', function() {
      assert.equal(fn.module.getBalanceFactor(client_6),200);
    });
  });
  describe('Branch coverage', function() {
    // covered by statement coverage
  });
  describe('Path coverage', function() {
    beforeEach(function () {
      client_1 = { balance: 7000 };
    });
    
    it('Path coverage AB', function() {
      assert.equal(fn.module.getBalanceFactor(client_1),0);
    });
  });
});