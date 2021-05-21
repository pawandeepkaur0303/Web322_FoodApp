const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    cate: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    mealImage: {
        data: Buffer,
        contentType: String
    },
});

module.exports = mongoose.model('Meal', MealSchema)
