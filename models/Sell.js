var mongoose = require('mongoose')

const SellSchema = mongoose.Schema({
    name: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
   // image: File,

    createdDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Sell', SellSchema)
