var express = require('express');
var router = express.Router();

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


router.get("/exchangeorsell", function (req, res, next) {
  res.render("ExchangeorSell", {})
});






module.exports = router;
