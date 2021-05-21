const MealPost = require("../../database/models/Meal");
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    
    try {
        let highlight = false;
        if (req.body.highlight) highlight = true;
        const { mealImage } = req.files;
        let imageData = mealImage.data;
        let imageType = mealImage.mimetype
        MealPost.create({
            ...req.body,
            mealImage: {
                data: imageData,
                contentType: imageType
            },
            highlight,
        })
        req.flash("success", "Meal Package added successfully")
        res.redirect("/mealpackages");
    } catch (error) {
        console.log("[controller:product:storeMealPackage] e", error);
        req.flash("fail", "Failed to add a Meal Package");
        res.redirect("/");
    }
}