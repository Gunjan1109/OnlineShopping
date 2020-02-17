var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Shopping' });
});

router.post('/' , function(req,res,next){
  console.log(req.body.email)
  console.log(req.body.password)
})

module.exports = router;
