var mongoose = require('mongoose')

const SellSchema = mongoose.Schema({
    username: String,
    contact: String,
    name: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    available: String,
    imagename: String,
    createdDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Sell', SellSchema)
