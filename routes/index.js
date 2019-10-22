var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/LogIn', function(req, res, next) {
  res.render('LogIn', { title: 'Express' });
});
router.get('/Register', function (req, res, next) {
  res.render('Register', { title: 'Express' });
});




module.exports = router;
