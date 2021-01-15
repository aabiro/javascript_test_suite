var fn = require("../app/order");
var af = require("../app/ageFactor");
var bf = require("../app/balanceFactor");
var c = require("../app/credit");
var p = require("../app/product");
var a = require("../app/account");

describe("An equivalence class suite", function () {
  beforeEach(function () {
    client_1 = { age: 10, balance: 0, creditScore: -1 };
    client_2 = { age: 19, balance: 50, creditScore: 25 }; //credit below
    client_3 = { age: 22, balance: 250, creditScore: 80 }; //credit above
    client_4 = { age: 36, balance: 800, creditScore: 120 };
    client_5 = { age: 60, balance: 2000, creditScore: 55 }; //credit inbetween mode thresholds
  });

  describe("should test the account module", function () {
    //more client account stubs here
    beforeEach(function () {
      client_6 = { age: 70, balance: 4000 };
      client_7 = { age: 120, balance: 7000 };
    });

    it("gets the age factor", function () {
      expect(af.purchaseOrder.getAgeFactor(client_1)).toBe(0);
      expect(af.purchaseOrder.getAgeFactor(client_2)).toBe(5);
      expect(af.purchaseOrder.getAgeFactor(client_3)).toBe(10);
      expect(af.purchaseOrder.getAgeFactor(client_4)).toBe(20);
      expect(af.purchaseOrder.getAgeFactor(client_5)).toBe(50);
      expect(af.purchaseOrder.getAgeFactor(client_6)).toBe(20);
      expect(af.purchaseOrder.getAgeFactor(client_7)).toBe(0);
    });

    it("gets the balance factor", function () {
      expect(bf.purchaseOrder.getBalanceFactor(client_1)).toBe(0);
      expect(bf.purchaseOrder.getBalanceFactor(client_2)).toBe(6);
      expect(bf.purchaseOrder.getBalanceFactor(client_3)).toBe(16);
      expect(bf.purchaseOrder.getBalanceFactor(client_4)).toBe(30);
      expect(bf.purchaseOrder.getBalanceFactor(client_5)).toBe(70);
      expect(bf.purchaseOrder.getBalanceFactor(client_6)).toBe(200);
      expect(bf.purchaseOrder.getBalanceFactor(client_7)).toBe(0);
    });

    it("gets the account status", function () {
      expect(a.purchaseOrder.accountStatus(client_1)).toBe("invalid");
      expect(a.purchaseOrder.accountStatus(client_2)).toBe("adverse");
      expect(a.purchaseOrder.accountStatus(client_3)).toBe("acceptable");
      expect(a.purchaseOrder.accountStatus(client_4)).toBe("good");
      expect(a.purchaseOrder.accountStatus(client_5)).toBe("excellent");
    });
  });

  describe("should test the credit status", function () {
    describe("in default mode", function () {
      beforeEach(function () {
        mode = "default";
      });

      it("gets the credit status", function () {
        expect(c.purchaseOrder.creditStatus(client_1, mode)).toBe("invalid");
        expect(c.purchaseOrder.creditStatus(client_2, mode)).toBe("adverse");
        expect(c.purchaseOrder.creditStatus(client_3, mode)).toBe("good");
        expect(c.purchaseOrder.creditStatus(client_4, mode)).toBe("invalid");
        expect(c.purchaseOrder.creditStatus(client_5, mode)).toBe("adverse");
      });
    });

    describe("in restricted mode", function () {
      beforeEach(function () {
        mode = "strict";
      });

      it("gets the credit status", function () {
        expect(c.purchaseOrder.creditStatus(client_1, mode)).toBe("invalid");
        expect(c.purchaseOrder.creditStatus(client_2, mode)).toBe("adverse");
        expect(c.purchaseOrder.creditStatus(client_3, mode)).toBe("good");
        expect(c.purchaseOrder.creditStatus(client_4, mode)).toBe("invalid");
        expect(c.purchaseOrder.creditStatus(client_5, mode)).toBe("good");
      });
    });
  });

  describe("should determine the product availability", function () {
    describe("#productStatus()", function () {

      beforeEach(function () {
        product = "invalid text";
        product_2 = null;
        product_3 = "toys";
        product_4 = "textbooks";
        product_5 = "computers";
        inventoryThreshold = 100;
        inventory = [
          { name: "toys", q: 0 }, //soldout
          { name: "textbooks", q: 50 }, //limited
          { name: "computers", q: 400 } //available
        ];
      });

      it("returns invalid if product not found", function () {
        expect(p.purchaseOrder.productStatus(product, inventory, inventoryThreshold)).toBe("invalid");
        expect(p.purchaseOrder.productStatus(product_2, inventory, inventoryThreshold)).toBe("invalid");
      });

      it("gets the product status", function () {
        expect(p.purchaseOrder.productStatus(product_3, inventory, inventoryThreshold)).toBe("soldout");
        expect(p.purchaseOrder.productStatus(product_4, inventory, inventoryThreshold)).toBe("limited");
        expect(p.purchaseOrder.productStatus(product_5, inventory, inventoryThreshold)).toBe("available");
      });
    });
  });

  describe("should handle the order actions correctly", function () {
    describe("#orderHandling()", function () {

      //stubs here
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
        //rejected
        client_1 = { age: 10, balance: 0, creditScore: 90 }; //invalid account
        client_2 = { age: 19, balance: 50, creditScore: 120 }; //invalid credit
        client_3 = { age: 22, balance: 250, creditScore: 25 }; //acceptable account / adverse credit
        client_6 = { age: 19, balance: 50, creditScore: 90 } //adverse account / good credit
        client_7 = { age: 19, balance: 50, creditScore: 25 } //adverse account / adverse credit
        //accepted
        client_4 = { age: 36, balance: 800, creditScore: 90 }; //good account and credit
        client_5 = { age: 60, balance: 2000, creditScore: 55 }; //excellent account
        client_8 = { age: 22, balance: 250, creditScore: 90 }; //acceptable account / good credit
        client_10 = { age: 19, balance: 99, creditScore: 90 }; //adverse account / good credit
        //under review 
        client_9 = { age: 36, balance: 800, creditScore: 25 }; //good account and adverse credit
      });

      it("gets the order status rejected", function () {
        expect(fn.purchaseOrder.orderHandling(client_1, product, inventory, inventoryThreshold, mode)).toBe("rejected");
        expect(fn.purchaseOrder.orderHandling(client_4, product_invalid, inventory, inventoryThreshold, mode)).toBe("rejected");
        expect(fn.purchaseOrder.orderHandling(client_2, product, inventory, inventoryThreshold, mode)).toBe("rejected");
        expect(fn.purchaseOrder.orderHandling(client_6, product_soldout, inventory, inventoryThreshold, mode)).toBe("rejected");
        expect(fn.purchaseOrder.orderHandling(client_3, product_soldout, inventory, inventoryThreshold, mode)).toBe("rejected");
        expect(fn.purchaseOrder.orderHandling(client_3, product_limited, inventory, inventoryThreshold, mode)).toBe("rejected");
        expect(fn.purchaseOrder.orderHandling(client_7, product, inventory, inventoryThreshold, mode)).toBe("rejected");
      });

      it("gets the order status accepted", function () {
        expect(fn.purchaseOrder.orderHandling(client_5, product, inventory, inventoryThreshold, mode)).toBe("accepted");
        expect(fn.purchaseOrder.orderHandling(client_4, product, inventory, inventoryThreshold, mode)).toBe("accepted");
        expect(fn.purchaseOrder.orderHandling(client_8, product, inventory, inventoryThreshold, mode)).toBe("accepted");
        expect(fn.purchaseOrder.orderHandling(client_10, product, inventory, inventoryThreshold, mode)).toBe("accepted");
      });

      it("gets the order status pending", function () {
        expect(fn.purchaseOrder.orderHandling(client_8, product_limited, inventory, inventoryThreshold, mode)).toBe("pending");
        expect(fn.purchaseOrder.orderHandling(client_8, product_soldout, inventory, inventoryThreshold, mode)).toBe("pending");
        expect(fn.purchaseOrder.orderHandling(client_6, product_limited, inventory, inventoryThreshold, mode)).toBe("pending");
      });

      it("gets the order status under review", function () {
        expect(fn.purchaseOrder.orderHandling(client_9, product_limited, inventory, inventoryThreshold, mode)).toBe("underReview");
        expect(fn.purchaseOrder.orderHandling(client_3, product, inventory, inventoryThreshold, mode)).toBe("underReview");
      });
    });
  });
});