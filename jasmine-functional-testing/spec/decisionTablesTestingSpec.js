var fn = require("../app/order");
var af = require("../app/ageFactor");
var bf = require("../app/balanceFactor");
var c = require("../app/credit");
var p = require("../app/product");
var a = require("../app/account");

describe("A decision tables test suite", function () {
    describe("should test the account module", function () {
      describe("#getAgeFactor() and #getBalanceFactor()", function () {
      //more client account stubs here
      beforeEach(function () {
          client_1 = { age: 10, balance: 0, creditScore: -1 };
          client_2 = { age: 19, balance: 50, creditScore: 25 }; //credit below
          client_3 = { age: 22, balance: 250, creditScore: 80 }; //credit above
          client_4 = { age: 36, balance: 800, creditScore: 120 };
          client_5 = { age: 60, balance: 2000, creditScore: 55 }; //credit inbetween
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
    });
    describe("#accountStatus()", function () {
      beforeEach(function () {
        overage_client = { age: 110, balance: 3000, creditScore: 200 };
        underage_client = { age: 10, balance: 2000, creditScore: 600 };
        within_age_client_excellent_balance = { age: 20, balance: 3000, creditScore: -1 };
        zero_balance_client = { age: 22, balance: 0, creditScore: 300 };
      });
      it("gives all accounts invalid status out of age range", function () {
        expect(a.purchaseOrder.accountStatus(overage_client)).toBe("invalid");
        expect(a.purchaseOrder.accountStatus(underage_client)).toBe("invalid");
      });
      it("gives all accounts invalid status with zero balance", function () {
        expect(a.purchaseOrder.accountStatus(zero_balance_client)).toBe("invalid");
      });
      it("gives all accounts excellent status within age range with >= 3000 balance", function () {
        expect(a.purchaseOrder.accountStatus(within_age_client_excellent_balance)).toBe("excellent");
      });
    });
  });
  describe("#creditStatus()", function () {
    beforeEach(function () {
      invalid_client_1 = { age: 40, balance: 900, creditScore: -2 };
      invalid_client_2 = { age: 60, balance: 2000, creditScore: 120 };
      adverse_client_1 = { age: 20, balance: 3000, creditScore: 55 };
      adverse_client_2 = { age: 20, balance: 3000, creditScore: 45 };
      good_client_1 = { age: 22, balance: 0, creditScore: 75 };
      good_client_2 = { age: 22, balance: 0, creditScore: 50 };
    });
    it("gives all accounts invalid when creditscore out of range", function () {
      expect(c.purchaseOrder.creditStatus(invalid_client_1, "default")).toBe("invalid");
      expect(c.purchaseOrder.creditStatus(invalid_client_2, "default")).toBe("invalid");
    });
    it("gives all accounts adverse when creditscore under threshold", function () {
      expect(c.purchaseOrder.creditStatus(adverse_client_1, "default")).toBe("adverse");
      expect(c.purchaseOrder.creditStatus(adverse_client_2, "strict")).toBe("adverse");
    });
    it("gives all accounts good when creditscore over or equal to threshold", function () {
      expect(c.purchaseOrder.creditStatus(good_client_1, "default")).toBe("good");
      expect(c.purchaseOrder.creditStatus(good_client_2, "strict")).toBe("good");
    });
  });
  describe("should get the correct product status", function () {
    describe("#productStatus()", function () {
      beforeEach(function () {
        product_soldout = "inventory_soldout";
        product_available = "inventory_over_threshold";
        product_limited = "inventory_under_threshold";
        inventoryThreshold = 100;
        inventory = [
          { name: "inventory_soldout", q: 0 }, //soldout
          { name: "inventory_over_threshold", q: 120 }, //available
          { name: "inventory_under_threshold", q: 40 } //limited
        ];
      });
      it("always gives soldout status when inventory = 0", function () {
        expect(p.purchaseOrder.productStatus(product_soldout, inventory, inventoryThreshold)).toBe("soldout");
      });
      it("gives limited status with threshold above quantity", function () {
        expect(p.purchaseOrder.productStatus(product_limited, inventory, inventoryThreshold)).toBe("limited");
      });
      it("gives available status with threshold below or equal to quantity", function () {
        expect(p.purchaseOrder.productStatus(product_available, inventory, inventoryThreshold)).toBe("available");
      });
    });
  });
});