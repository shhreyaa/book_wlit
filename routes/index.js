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

router.get("/viewOne",function(req,res,next)
{
  res.render("viewOne")
})


router.get("/exchange", function (req, res, next) {
  res.render("Exchange")
})

router.get("/exchangeorbuy", function (req, res, next) {
  res.render("ExchangeorBuy")
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
      genre: req.body.genre
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
      price : req.body.price
    })
  var promise = sell.save()
  promise.then((sell) => {
    res.redirect('/exchangeorbuy')
  })
});

router.get('/viewOne/:_id', function (req, res, next) {
  Exchanges.findById({ _id: req.params._id }).then((exchange) =>//function(err,movie)
  {
    console.log('movie selected', exchange);
    res.render('viewOne', {exchange});
  })
    .catch((err) => {
      res.render('error');
    })

});

module.exports = router;
