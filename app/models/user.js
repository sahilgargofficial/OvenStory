const mongoose = require('mongoose')
const Schema = mongoose.Schema

// skeleton or blueprint of document
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "customer",}
}, {timestamps: true})

// create model
module.exports = mongoose.model('pizza_users', userSchema);