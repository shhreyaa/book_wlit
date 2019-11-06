var mongoose = require('mongoose')
const SearchSchema = mongoose.Schema(
    {   name:String
            });
 module.exports = mongoose.model('Search', SearchSchema);