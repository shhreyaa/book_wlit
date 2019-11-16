var mongoose = require('mongoose')

const SellSchema = mongoose.Schema({
    username: String,
    useremail:String,
    contact: String,
    name: String,
    author: String,
    genre: String,
    condition: String,
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
