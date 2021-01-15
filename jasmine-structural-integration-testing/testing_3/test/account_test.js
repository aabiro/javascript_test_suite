var assert = require('assert');
var fn = require("../app/account")

describe('accountStatus Structural test suite', function() {
  describe('Statement coverage', function() {
    beforeEach(function () {
      client_1 = { age: 10, balance: 0 }; //factor3 = 0
      client_2 = { age: 17, balance: 90 }; //factor3 = 30
      client_3 = { age: 35, balance: 90 }; //factor3 = 120
      client_4 = { age: 55, balance: 250 }; //factor3 = 800
    });
    
    it('Statement coverage factor3 = 0', function() {
      assert.equal(fn.module.accountStatus(client_1),"invalid");
    });
    it('Statement coverage factor3 = 30', function() {
      assert.equal(fn.module.accountStatus(client_2),"adverse");
    });
    it('Statement coverage factor3 = 120', function() {
      assert.equal(fn.module.accountStatus(client_3),"acceptable");
    });
    it('Statement coverage factor3 = 800', function() {
      assert.equal(fn.module.accountStatus(client_4),"good");
    });
  });
  describe('Branch coverage', function() {
    beforeEach(function () {
      client_1 = { age: 70, balance: 4999 };
    });

    it('Statement coverage factor3 = 4000', function() {
      assert.equal(fn.module.accountStatus(client_1),"excellent");
    });
  });
  describe('Path coverage', function() {
    // covered in statement and branch coverage
  });
});