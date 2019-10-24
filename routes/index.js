var express = require('express');
var router = express.Router();
var Exchanges = require('../models/Exchange');
var Sellbooks = require('../models/Sell');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/register", function(req,res, next)
{
  res.render("Register")
});

router.get("/LogIn", function (req, res, next) {
  res.render("LogIn")
});

// router.get("/viewOne",function(req,res,next)
// {
//   res.render("viewOne")
// })


router.get("/exchange", function (req, res, next) {
  res.render("Exchange")
})

router.get("/exchangeorbuy", function (req, res, next) {

  Sellbooks.find().exec((err, Sell) => {
    Exchanges.find().exec((err, Exchange) => {
      res.render("ExchangeorBuy", { Exchange , Sell})

    })
    })
});





router.get("/sell", function (req, res, next) {
res.render("Sell")
});

router.post("/exchange", function (req, res, next) {
  console.log(req.body)
  var exchange = new Exchanges
    ({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      photo: req.body.photo
    })
  var promise = exchange.save()
  promise.then((exchange) => {
    res.redirect('/exchangeorbuy')
  })
});


router.post("/sell", function (req, res, next) {
  console.log(req.body)
  var sell = new Sellbooks
    ({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      price : req.body.price,
      photo : req.body.photo
    })
  var promise = sell.save()
  promise.then((sell) => {
    res.redirect('/exchangeorbuy')
  })
});

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
    
    res.redirect('/exchangeorbuy');

  })
    .catch((err) => {
      res.render('error')
    })
});
router.get('/deleteOnesell/:_id', function (req, res, next) {
  Sellbooks.deleteOne({ _id: req.params._id }).then((sell) =>//function(err,movie)
  {
    
    res.redirect('/exchangeorbuy');

  })
    .catch((err) => {
      res.render('error')
    })
});

router.post('/updateOneexchange', function (req, res, next) {
  Exchanges.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }).then((exchange) =>//function(err,movie)
  {
    
    res.redirect('/exchangeorbuy');

  })
    .catch((err) => {
      res.render('error')
    })
});;

router.post('/updateOnesell', function (req, res, next) {
  Sellbooks.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }).then((sell) =>//function(err,movie)
  {
    
    res.redirect('/exchangeorbuy');

  })
    .catch((err) => {
      res.render('error')
    })
});
module.exports = router;
