var mongoose = require('mongoose')
const ExchangeSchema = mongoose.Schema(
    {   username: String,
        contact:String,
        name: String,
        author: String,
        genre: String, 
        description: String,
        photo: String,
        available: String,
        exchangegenre:String,
        // condition: String,
        imagename: String,
        booked:false,
         createdDate: {
              type: Date,
               default: Date.now
             } 
            });
 module.exports = mongoose.model('Exchange', ExchangeSchema);