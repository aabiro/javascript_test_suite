exports.module = {
    getBalanceFactor :
    function (clientAccount) {
    var factor;
    if (clientAccount.balance <= 0 || clientAccount.balance >= 5000)
        factor = 0;
    else if (clientAccount.balance < 100)
        factor = 6;
    else if (clientAccount.balance < 500)
        factor = 16;
    else if (clientAccount.balance < 1000)
        factor = 30;
    else if (clientAccount.balance < 3000)
        factor = 70;
    else if ( clientAccount.balance < 5000)
        factor = 200;
    return factor;
    }
}