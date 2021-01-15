exports.module = {
    getAgeFactor :
    function (clientAccount) {
        { var factor ;
            if (clientAccount.age <15 || clientAccount.age >= 110)
                factor= 0;
            else  if (clientAccount.age <20)
                factor = 5;
            else if (clientAccount.age <30)
                factor= 10;
            else if (clientAccount.age <40)
                factor=20;
            else if (clientAccount.age <65)
                factor =50;
            else if (clientAccount.age < 110)
                factor =20;
            return factor;
        }
    }
}