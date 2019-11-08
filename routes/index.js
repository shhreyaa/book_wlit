var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Exchanges = require('../models/Exchange');
var Sellbooks = require('../models/Sell');
var Search=require('../models/Search')


const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
// const upload= multer({dest: 'upload/'});
//store and validation
// const multerConfig = {
//   storage : multer.diskStorage({
//     destination : function(req, file, next){
//       next(null,'./public/images');
//     },
//      filename: function (req, file, next) {
//         const ext = file.ninetype.split('/')[1];
//         next(null,file.fieldname + '-' + Date.now()+ '.' + ext);
//      }
//   }),
//  fileFilter: function(req, file, next){
//    if(!file){
//      next();
//    }
//    const image = file.minetype.startsWith('image/');
//    if(image){
//      next (null, true);
//    } else {
//      next({message:"File not supported"},false);
//    }
//  }
// };

//storage function
// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//     cb(null,'./uploads');
//   },
//   filename: function(req,file,cb){
//     cb(null,new Date().toISOString()+ file.orinalname);
//   }
// })
// //
// const uploads = multer({storage : storage })
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get("/register", function(req,res, next)
{
  res.render("Register")
});
router.get("/profile", function(req,res, next)
{
  res.render("profile")
});

router.get("/LogIn", function (req, res, next) {
  res.render("LogIn")
});

// router.get("/viewOne",function(req,res,next)
// {
//   res.render("viewOne")
// })


router.get("/exchange", function (req, res, next) {
  res.render("ExchangeForm")
})

router.get("/buy", function (req, res, next) {

  Sellbooks.find().exec((err, Sell) => {
   
  
      res.render("Buy", {Sell})

    
    })
});
// router.get("/booksavailable", function (req, res, next) {

//   Exchanges.aggregate(
//     [
//     {$match: req.exchangegenre }, function (err, Exchange) {
//     console.log(Exchange)
//     // res.redirect('/Exchangebooks')
   
  
//       res.render("Exchangebooks", {Exchange})

    
//     })
// });





router.get("/sell", function (req, res, next) {
res.render("Sell")
});

router.post("/exchange", upload.single('photo'),function (req, res, next) {
  console.log(req.body)
  var exchange = new Exchanges
    ({
      username:req.body.username,
      contact:req.body.contact,
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      available:req.body.available,
      photo: req.body.photo
      
    })
  var promise = exchange.save()
  promise.then((exchange) => {
    res.redirect('/Exchangebooks')
  })
});


router.post("/sell",upload.single('photo'), function (req, res) {
  console.log(req.body);
  console.log(req.file);
  var sell = new Sellbooks
    ({
      username:req.body.username,
      contact:req.body.contact,
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      price : req.body.price,
      available:req.body.available,
      photo : req.body.photo
    })
  var promise = sell.save()
  promise.then((sell) => {
    res.redirect('/buy')
  })
});

// router.get('/viewOnesell/:_id',  multer(multerConfig).single("photo"),  function (req, res, next) {
router.get('/viewOnesell/:_id', function (req, res, next) {
  Sellbooks.findById({ _id: req.params._id }).then((Sell) =>//function(err,movie)
  {
    console.log('book selected', Sell);

    res.render('viewOnesell', {Sell});
  })
    .catch((err) => {
      res.render('error');
    })

});

router.get('/viewOneexchange/:_id', function (req, res, next) {
  Exchanges.findById({ _id: req.params._id }).then((exchange) =>//function(err,movie)
  {
    console.log('book selected', exchange);

    res.render('viewOneexchange', {exchange});
  })
    .catch((err) => {
      res.render('error');
    })

});

router.get('/updateOneexchange/:_id', function (req, res, next) {
  Exchanges.findOne({ _id: req.params._id }).then((exchange) =>//function(err,movie)
  {
    
    res.render('updateoneexchange', { exchange });

  })
    .catch((err) => {
      res.render('error')
    })
});

router.get('/updateOnesell/:_id', function (req, res, next) {
  Sellbooks.findOne({ _id: req.params._id }).then((sell) =>//function(err,movie)
  {

    res.render('updateonesell', { sell });

  })
    .catch((err) => {
      res.render('error')
    })
});
router.get('/deleteOneexchange/:_id', function (req, res, next) {
  Exchanges.deleteOne({ _id: req.params._id }).then((exchange) =>//function(err,movie)
  {
    
    res.redirect('/booksavailable');

  })
    .catch((err) => {
      res.render('error')
    })
});
router.get('/deleteOnesell/:_id', function (req, res, next) {
  Sellbooks.deleteOne({ _id: req.params._id }).then((sell) =>//function(err,movie)
  {
    
    res.redirect('/buy');

  })
    .catch((err) => {
      res.render('error')
    })
});

router.post('/updateviewOneexchange/', function (req, res, next) {
  Exchanges.findOneAndUpdate({ name: req.body.name }, { $set: req.body }, function (err, book) {
    console.log(book)
    res.redirect('/exchangeorbuy')
    //res.render("updateMovie", { movie })
    // res.redirect("/viewMovies");

  })
  // Exchanges.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }).then((exchange) =>//function(err,movie)
  // {
  //  console.log 
  //   res.redirect('/exchangeorbuy');

  // })
  //   .catch((err) => {
  //     res.render('error')
  //   })
});;

router.post('/updateviewOnesell/', function (req, res, next) {
  Sellbooks.findOneAndUpdate({ name: req.body.name }, { $set: req.body }).then((sell) =>//function(err,movie)
  {
    
    res.redirect('/buy');

  })
    .catch((err) => {
      res.render('error')
    })
});

router.post("/searchsell", function (req, res, next) {
 
  name=req.body.name
Sellbooks.findOne({name})
.then((Sell) =>
{
  console.log('book selected', Sell);

  res.render('viewOnesell', {Sell});
})
.catch((err) => {
  res.render('error')
});
 


 
});
router.post("/searchexchange", function (req, res, next) {
 
  name=req.body.name
Exchanges.findOne({name}).then((exchange) =>//function(err,movie)
{
  res.render('viewOneexchange', {exchange});
  

})

.catch((err) => {
  res.render('error')
})
 


 
});
module.exports = router;