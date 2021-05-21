const dishes=
{
    fakedbdish : [],

    initDB()
    {
        this.fakedbdish.push({
            title: "Chicken Teriyaki",
            price: 11.95,
            imgPath: "Chicken_Teriyaki_11.95.jpg"
        })
        this.fakedbdish.push({
            title: "Beef Gratin",
            price: 11.95,
            imgPath:"Beef_Gratin_11.95.jpg"
        })
        this.fakedbdish.push({
            title: "Coconut Curry Salmon",
            price: 11.95,
            imgPath: "Coconut_Curry_Salmon_11.95.jpg"
        })
        this.fakedbdish.push({
            title: "Coconut Curry Shrimp",
            price: 11.95,
            imgPath:"Coconut_Curry_Shrimp_11.95.jpg"
        })
    },

    getAllProducts()
    {
return this.fakedbdish;
    }
}
dishes.initDB();
module.exports = dishes;