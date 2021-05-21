const package=
{
    fakedb : [],

    initDB()
    {
        this.fakedb.push({
            title: "Weight Loss Package",
            price: 145,
            top : true,
            Meals : 5,
            imgPath: "pack1.jpg"
        })
        this.fakedb.push({
            title: "Muscle Gain Package",
            price: 150,
            top : false,
            Meals : 5,
            imgPath:"pack2.jpg"
        })
        this.fakedb.push({
            title: "Vegie Package",
            price: 115,
            top : true,
            Meals : 7,
            imgPath: "pack3.jpg"
        })
        this.fakedb.push({
            title: "Fat Burner Package",
            price: 160,
            top : false,
            Meals : 6,
            imgPath:"pack4.jpg"
        })
    },

    getAllProducts()
    {
return this.fakedb;
    }
}
package.initDB();
module.exports = package;
