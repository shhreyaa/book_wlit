var mongoose=require('mongoose');
var uploadSchema =mongoose.Schema({
	imagename: String,

});

module.exports=mongoose.model('uploadimage',uploadSchema)