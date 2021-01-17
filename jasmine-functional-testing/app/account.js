var af = require("./ageFactor");
var bf = require("./balanceFactor");

exports.purchaseOrder = {
    accountStatus :
    function (clientAccount) {
        var factor1 = af.purchaseOrder.getAgeFactor(clientAccount );
        var factor2 = bf.purchaseOrder.getBalanceFactor(clientAccount );
        var factor3 = factor1 * factor2;
        if (factor3 == 0)
            return "invalid";
        else if (factor3 < 100)
            return "adverse";
        else if (factor3 < 500)
            return "acceptable";
        else if (factor3 < 1000)
            return "good"
        else
            return "excellent";
    }
}