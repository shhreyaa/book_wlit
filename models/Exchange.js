var mongoose = require('mongoose')
const ExchangeSchema = mongoose.Schema(
    {
        name: String,
        author: String,
        genre: String, 
        description: String,
        photo: {type: String},
         createdDate: {
              type: Date,
               default: Date.now
             } 
            });
 module.exports = mongoose.model('Exchange', ExchangeSchema);