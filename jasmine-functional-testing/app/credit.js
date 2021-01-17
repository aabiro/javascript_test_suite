exports.purchaseOrder = {
    creditStatus : 
    function (clientAccount, creditCheckMode) {
        var scoreThreshold;
        if (clientAccount.creditScore < 0 || clientAccount.creditScore > 100)
            return "invalid";
        if (creditCheckMode ==="strict")
            scoreThreshold=50;
        else if (creditCheckMode ==="default")
            scoreThreshold=75;
        if (clientAccount.creditScore < scoreThreshold)
            return "adverse";
        else return "good";
    }
}