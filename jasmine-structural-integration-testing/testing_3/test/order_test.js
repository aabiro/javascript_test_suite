var assert = require('assert');
var fn = require("../app/order")

describe('handleOrder Structural test suite', function() {
  beforeEach(function () {
    mode = "default";
    product = "computers";
    product_invalid = "invalid";
    product_soldout = "toys";
    product_limited = "textbooks";
    inventoryThreshold = 100;
    inventory = [
      { name: "toys", q: 0 }, //soldout
      { name: "textbooks", q: 50 }, //limited
      { name: "computers", q: 400 } //available
    ];
    client_1 = { age: 10, balance: 0, creditScore: 90 }; //invalid account
    client_2 = { age: 19, balance: 50, creditScore: 120 }; //invalid credit
    client_8 = { age: 22, balance: 250, creditScore: 25 }; //acceptable account / adverse credit
    client_6 = { age: 19, balance: 50, creditScore: 90 } //adverse account / good credit
    client_7 = { age: 19, balance: 50, creditScore: 25 } //adverse account / adverse credit
    client_2 = { age: 36, balance: 800, creditScore: 90 }; //good account and credit
    client_5 = { age: 60, balance: 2000, creditScore: 55 }; //excellent account
    client_3 = { age: 22, balance: 250, creditScore: 90 }; //acceptable account / good credit
    client_10 = { age: 19, balance: 99, creditScore: 90 }; //adverse account / good credit
    client_4 = { age: 36, balance: 800, creditScore: 25 }; //good account and adverse credit
  });
  describe('Statement coverage', function() {
      it("gets the order status rejected", function () {
        assert.equal(fn.module.orderHandling(client_7, product_limited, inventory, inventoryThreshold, mode), "rejected");
      });

      it("gets the order status accepted", function () {
        assert.equal(fn.module.orderHandling(client_2, product, inventory, inventoryThreshold, mode), "accepted");
      });

      it("gets the order status pending", function () {
        assert.equal(fn.module.orderHandling(client_3, product_limited, inventory, inventoryThreshold, mode), "pending");
        assert.equal(fn.module.orderHandling(client_10, product_limited, inventory, inventoryThreshold, mode), "pending");
      });

      it("gets the order status under review", function () {
        assert.equal(fn.module.orderHandling(client_4, product, inventory, inventoryThreshold, mode), "underReview");
        assert.equal(fn.module.orderHandling(client_8, product, inventory, inventoryThreshold, mode), "underReview");
      });
  });
  describe('Branch coverage', function() {
    // see statement/integration
  });
  describe('Path coverage', function() {
    // see statement/integration
  });
});
describe('handleOrder Integration test suite', function() {
  beforeEach(function () {
    mode = "default";
    product = "computers";
    product_invalid = "invalid";
    product_soldout = "toys";
    product_limited = "textbooks";
    inventoryThreshold = 100;
    inventory = [
      { name: "toys", q: 0 }, //soldout
      { name: "textbooks", q: 50 }, //limited
      { name: "computers", q: 400 } //available
    ];
    client_1 = { age: 10, balance: 0, creditScore: 90 }; //invalid account
    client_2 = { age: 19, balance: 50, creditScore: 120 }; //invalid credit
    client_8 = { age: 22, balance: 250, creditScore: 25 }; //acceptable account / adverse credit
    client_6 = { age: 19, balance: 50, creditScore: 90 } //adverse account / good credit
    client_7 = { age: 19, balance: 50, creditScore: 25 } //adverse account / adverse credit
    client_2 = { age: 36, balance: 800, creditScore: 90 }; //good account and credit
    client_5 = { age: 60, balance: 2000, creditScore: 55 }; //excellent account
    client_3 = { age: 22, balance: 250, creditScore: 90 }; //acceptable account / good credit
    client_10 = { age: 19, balance: 99, creditScore: 90 }; //adverse account / good credit
    client_4 = { age: 36, balance: 800, creditScore: 25 }; //good account and adverse credit
  });
  it("MM-Path test case 1", function () {
    assert.equal(fn.module.orderHandling(client_3, product_limited, inventory, inventoryThreshold, mode), "pending");
    assert.equal(fn.module.orderHandling(client_10, product_limited, inventory, inventoryThreshold, mode), "pending");
  });
  it("MM-Path test case 2", function () {
    assert.equal(fn.module.orderHandling(client_4, product, inventory, inventoryThreshold, mode), "underReview");
    assert.equal(fn.module.orderHandling(client_8, product, inventory, inventoryThreshold, mode), "underReview");
  });
  it("MM-Path test case 3", function () {
    assert.equal(fn.module.orderHandling(client_2, product, inventory, inventoryThreshold, mode), "accepted");
  });
  it("MM-Path test case 4", function () {
    assert.equal(fn.module.orderHandling(client_1, product_invalid, inventory, inventoryThreshold, mode), "rejected");
    assert.equal(fn.module.orderHandling(client_6, product_soldout, inventory, inventoryThreshold, mode), "rejected");
    assert.equal(fn.module.orderHandling(client_7, product_limited, inventory, inventoryThreshold, mode), "rejected");
  });
});