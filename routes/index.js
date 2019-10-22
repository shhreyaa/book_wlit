var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'hater' });
});



router.get("/register", function(req,res, next)
{
  res.render("LogIn")
});

router.post("/adduser", function (req, res, next) {
  res.render("LogIn")
});

router.get("/buy books", function (req, res, next) {
  res.render("/", {})
});
router.get("/sell books", function (req, res, next) {
  res.render("/", {})
});
router.get("/register", function (req, res, next) {
  res.render("/", {})
});





module.exports = router;
