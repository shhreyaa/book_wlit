var mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
      name: String,
      author: String,
      genre: String,
      description: String,
      genre : String,
      price: Number,

      createdDate: {
          type: Date,
          default: Date.now
      }

});
mondule.exports = mongoose.model('Books', MovieSchema)