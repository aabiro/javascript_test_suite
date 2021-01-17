var assert = require('assert');
var fn = require("../app/product")

describe('productStatus Structural test suite', function() {
  beforeEach(function () {
    product_invalid = "invalid_string"
    product_valid = "valid_string"
    product_soldout = "inventory_soldout";
    product_available = "inventory_over_threshold";
    product_limited = "inventory_under_threshold";
    inventoryThreshold = 100;
    inventory = [
      { name: "inventory_soldout", q: 0 }, //soldout
      { name: "inventory_over_threshold", q: 120 }, //available
      { name: "inventory_under_threshold", q: 40 } //limited
    ];
    blank_inventory = [];
    inventory_looping = [
      { name: "shshshd", q: 0 },
      { name: "valid_string", q: 120 }
    ]
  });
  describe('Statement coverage', function() {
    
    
    it('Statement coverage q == 0', function() {
      assert.equal(fn.module.productStatus(product_soldout, inventory, inventoryThreshold),"soldout");

    });
    it('Statement coverage q < inventory threshold', function() {
      assert.equal(fn.module.productStatus(product_limited, inventory, inventoryThreshold),"limited");
    });
  });
  describe('Branch coverage', function() {
    // covered by statement coverage
  });
  describe('Path coverage', function() {
      it('Path coverage AI', function() {
        assert.equal(fn.module.productStatus(product_available, blank_inventory, inventoryThreshold), "invalid");
      });
      it('Path coverage ABAI', function() {
        assert.equal(fn.module.productStatus(product_invalid, inventory_looping, inventoryThreshold), "invalid");
      });
      it('Path coverage ABABCD', function() {
        assert.equal(fn.module.productStatus(product_valid, inventory_looping, inventoryThreshold), "available");
      });
  });
});