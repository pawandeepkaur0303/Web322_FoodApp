const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    "firstname":  String,
    "lastname": String,
    "Email": String,
    "Password": String,
    "employee": String
  });


module.exports = mongoose.model('meal_users',dataSchema);