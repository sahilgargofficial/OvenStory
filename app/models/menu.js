const mongoose = require('mongoose')
const Schema = mongoose.Schema

// skeleton or blueprint of document
const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    }
})

// create model
module.exports = mongoose.model('pizza_menus', menuSchema);