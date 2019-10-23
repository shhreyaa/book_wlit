var express = require('express');
var router = express.Router();
var Books = require('../models/book');

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


router.get("/exchange", function (req, res, next) {
  res.render("Exchange")
})

router.get("/exchangeorbuy", function (req, res, next) {
  res.render("ExchangeorBuy")
});
router.get("/sell", function (req, res, next) {
  res.render("Sell")
});



module.exports = router;
