var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Exchanges = require('../models/Exchange');
var Sellbooks = require('../models/Sell');
var path = require('path');
// var Search = require('../models/Search');



var multer = require('multer'); 
// import nodemailer (after npm install nodemailer)
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookstop.wlit@gmail.com',
    pass: 'book@123'
  }
});
router.post('/confirmbuy', function(req, res, next) {
  var mailOptions = {
    from: 'bookstop.wlit@gmail.com',
    to:req.body.selleremail,
    subject:"Buyer information",
    text: "The buyer details: Name  :"+ req.body.username +" Contact "+req.body.contact+" Email: "+req.body.useremail,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  } )
  res.redirect("/buy")
}
);








var Storage= multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage:Storage
}).single('file');

 
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
  
  
//   });






router.get("/sell", function (req, res, next) {
res.render("Sell")
});

router.post("/exchange", upload,function (req, res, next) {
  console.log(req.body)
  var imageFile=req.file.filename;
  var exchange = new Exchanges
    ({
      username:req.body.username,
      contact:req.body.contact,
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      available:req.body.available,
      exchangegenre:req.body.exchangegenre,
      imagename :imageFile
      
      
    })
  var promise = exchange.save()
  promise.then((exchange) => {

    Exchanges.find({ genre: req.body.exchangegenre }, function (err, Exchange) {
      var exchangebooks=[];
      for(i=0;i<Exchange.length;i++)
      {
        if(Exchange[i].genre == req.body.genre){
          exchangebooks[i]=Exchange[i];
        }
        else
        {
          continue;
        }

      }
      console.log(exchangebooks);
      
     
      res.render('Exchangebooks',{exchangebooks});
    // })
      
    // Exchanges.aggregate([
    //   {
    //     $lookup:
    //     {
    //       from: 'exchanges',
    //       localField: 'exchangegenre',
    //       foreignField: 'req.body.genre',
    //       as : 'same'
          
    //     }
        
    //   }
    //   // {
    //   //   $match: { "same": { $ne: [] } }
    //   // }
        
    //      ]).exec((err,Exchange)=>{
    //        if(err)
    //        {
    //          res.render('error');
    //        }
    //      if(Exchange)
    //      { console.log(Exchange);
    //        res.render('Exchangebooks',{Exchange});
    //      }
    //   })
    //   .catch((err) => {
    //     res.render('error')
    //   });
    })
    })
});


router.post("/sell",upload, function (req, res) {

  var imageFile=req.file.filename;
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
      imagename :imageFile
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
