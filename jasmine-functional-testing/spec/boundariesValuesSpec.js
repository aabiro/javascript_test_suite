var fn = require("../app/order");
var af = require("../app/ageFactor");
var bf = require("../app/balanceFactor");
var c = require("../app/credit");
var p = require("../app/product");
var a = require("../app/account");

describe("A boundaries values test suite", function () {
  describe("should test the account module", function () {
    describe("#getAgeFactor() and #getBalanceFactor()", function () {
      beforeEach(function () {
        //boundary values for age and balance
        client_1 = { age: 14, balance: 0 }; //A1 B1
        client_2 = { age: 15, balance: 1 };  //A2 B2
        client_3 = { age: 16, balance: 2 };
        client_4 = { age: 18, balance: 98 };
        client_5 = { age: 19, balance: 99 };
        client_6 = { age: 20, balance: 100 }; //A3 B3
        client_7 = { age: 28, balance: 498 };
        client_8 = { age: 29, balance: 499 };
        client_9 = { age: 30, balance: 500 }; //A4 B4
        client_10 = { age: 38, balance: 998 };
        client_11 = { age: 39, balance: 999 };
        client_12 = { age: 40, balance: 1000 }; //A5 B5 
        client_13 = { age: 64, balance: 2998 };
        client_14 = { age: 65, balance: 2999 }; //A6 B6
        client_15 = { age: 66, balance: 3000 };
        client_16 = { age: 109, balance: 4998 };
        client_17 = { age: 110, balance: 4999 }; //A7 B7    
        client_18 = { age: 111, balance: 5000 };
      });

      it("gets the age factor", function () {
        expect(af.purchaseOrder.getAgeFactor(client_1)).toBe(0);
        expect(af.purchaseOrder.getAgeFactor(client_2)).toBe(5);
        expect(af.purchaseOrder.getAgeFactor(client_3)).toBe(5);
        expect(af.purchaseOrder.getAgeFactor(client_4)).toBe(5);
        expect(af.purchaseOrder.getAgeFactor(client_5)).toBe(5);
        expect(af.purchaseOrder.getAgeFactor(client_6)).toBe(10);
        expect(af.purchaseOrder.getAgeFactor(client_7)).toBe(10);
        expect(af.purchaseOrder.getAgeFactor(client_8)).toBe(10);
        expect(af.purchaseOrder.getAgeFactor(client_9)).toBe(20);
        expect(af.purchaseOrder.getAgeFactor(client_10)).toBe(20);
        expect(af.purchaseOrder.getAgeFactor(client_11)).toBe(20);
        expect(af.purchaseOrder.getAgeFactor(client_12)).toBe(50);
        expect(af.purchaseOrder.getAgeFactor(client_13)).toBe(50);
        expect(af.purchaseOrder.getAgeFactor(client_14)).toBe(20);
        expect(af.purchaseOrder.getAgeFactor(client_15)).toBe(20);
        expect(af.purchaseOrder.getAgeFactor(client_16)).toBe(20);
        expect(af.purchaseOrder.getAgeFactor(client_17)).toBe(0);
        expect(af.purchaseOrder.getAgeFactor(client_18)).toBe(0);
      });


      it("gets the balance factor", function () {
        expect(bf.purchaseOrder.getBalanceFactor(client_1)).toBe(0); //B1
        expect(bf.purchaseOrder.getBalanceFactor(client_2)).toBe(6); //B2
        expect(bf.purchaseOrder.getBalanceFactor(client_3)).toBe(6);
        expect(bf.purchaseOrder.getBalanceFactor(client_4)).toBe(6);
        expect(bf.purchaseOrder.getBalanceFactor(client_5)).toBe(6);
        expect(bf.purchaseOrder.getBalanceFactor(client_6)).toBe(16); //B3
        expect(bf.purchaseOrder.getBalanceFactor(client_7)).toBe(16);
        expect(bf.purchaseOrder.getBalanceFactor(client_8)).toBe(16);
        expect(bf.purchaseOrder.getBalanceFactor(client_9)).toBe(30); //B4
        expect(bf.purchaseOrder.getBalanceFactor(client_10)).toBe(30);
        expect(bf.purchaseOrder.getBalanceFactor(client_11)).toBe(30);
        expect(bf.purchaseOrder.getBalanceFactor(client_12)).toBe(70); //B5
        expect(bf.purchaseOrder.getBalanceFactor(client_13)).toBe(70);
        expect(bf.purchaseOrder.getBalanceFactor(client_14)).toBe(70);
        expect(bf.purchaseOrder.getBalanceFactor(client_15)).toBe(200); //B6
        expect(bf.purchaseOrder.getBalanceFactor(client_16)).toBe(200);
        expect(bf.purchaseOrder.getBalanceFactor(client_17)).toBe(200);
        expect(bf.purchaseOrder.getBalanceFactor(client_18)).toBe(0); //B7
      });
    });
  });

  describe("should test the credit status", function () {
    describe("#creditStatus()", function () {
      //boundary values for creditScore
      beforeEach(function () {
        client_1 = { creditScore: -1 };
        client_2 = { creditScore: 0 };
        client_3 = { creditScore: 1 };
        client_4 = { creditScore: 49 };
        client_5 = { creditScore: 50 };
        client_6 = { creditScore: 51 };
        client_7 = { creditScore: 74 };
        client_8 = { creditScore: 75 };
        client_9 = { creditScore: 76 };
        client_10 = { creditScore: 99 };
        client_11 = { creditScore: 100 };
        client_12 = { creditScore: 101 };
      });

      describe("in default mode", function () {
        beforeEach(function () {
          mode = "default";
        });

        it("gets the credit status", function () {
          expect(c.purchaseOrder.creditStatus(client_1, mode)).toBe("invalid");
          expect(c.purchaseOrder.creditStatus(client_2, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_3, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_4, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_5, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_6, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_7, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_8, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_9, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_10, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_11, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_12, mode)).toBe("invalid");
        });
      });

      describe("in restricted mode", function () {
        beforeEach(function () {
          mode = "strict";
        });

        it("gets the credit status", function () {
          expect(c.purchaseOrder.creditStatus(client_1, mode)).toBe("invalid");
          expect(c.purchaseOrder.creditStatus(client_2, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_3, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_4, mode)).toBe("adverse");
          expect(c.purchaseOrder.creditStatus(client_5, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_6, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_7, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_8, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_9, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_10, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_11, mode)).toBe("good");
          expect(c.purchaseOrder.creditStatus(client_12, mode)).toBe("invalid");
        });
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
        product_6 = "tools";
        product_7 = "paper";
        inventoryThreshold = 100;
        inventoryThreshold_2 = -1;
        inventoryThreshold_3 = 0;
        inventoryThreshold_4 = 1;
        inventoryThreshold_5 = 999;
        inventoryThreshold_6 = 1000;
        inventoryThreshold_7 = 1001;
        //boundary values over the threshold
        inventory = [
          { name: "toys", q: 0 }, //soldout
          { name: "textbooks", q: 1 }, //limited
          { name: "computers", q: 99 }, //limited
          { name: "tools", q: 100 }, //available
          { name: "paper", q: 101 } //available
        ];
      });

      it("returns invalid if product not found", function () {
        expect(p.purchaseOrder.productStatus(product, inventory, inventoryThreshold)).toBe("invalid");
        expect(p.purchaseOrder.productStatus(product_2, inventory, inventoryThreshold)).toBe("invalid");
      });

      it("gets the product status", function () {
        expect(p.purchaseOrder.productStatus(product_3, inventory, inventoryThreshold)).toBe("soldout");
        expect(p.purchaseOrder.productStatus(product_4, inventory, inventoryThreshold)).toBe("limited");
        expect(p.purchaseOrder.productStatus(product_5, inventory, inventoryThreshold)).toBe("limited");
        expect(p.purchaseOrder.productStatus(product_6, inventory, inventoryThreshold)).toBe("available");
        expect(p.purchaseOrder.productStatus(product_7, inventory, inventoryThreshold)).toBe("available");
      });
    });
  });
});