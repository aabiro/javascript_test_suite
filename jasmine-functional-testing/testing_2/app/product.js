exports.purchaseOrder = {
    productStatus :
    function (product, inventory, inventoryThreshold) {
        var q;
        for (i=0;i<inventory.length;i++)
        {
            if (product == inventory[i].name)
                {
                q=inventory[i].q;
                if (q==0)
                    return "soldout";
                else if (q < inventoryThreshold)
                    return "limited"
                else 
                    return "available"
            }
        }
        return "invalid";
    }
}