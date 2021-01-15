var af = require("./age");
var bf = require("./balance");

exports.module = {
    accountStatus :
    function (clientAccount) {
    var factor1 = af.module.getAgeFactor(clientAccount);
    var factor2 = bf.module.getBalanceFactor(clientAccount);
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