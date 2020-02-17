var express = require('express');
var http = require('http')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Shopping' });
});

router.post('/' , function(req,res,next){
  //json data to post
  const data = JSON.stringify({
    email : req.body.email,
    password : req.body.password
  });

  //create options

  const options = {
    hostname : req.hostname,
    port : 3000,
    path : '/users/signin',
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'Content-Length' : data.length
    }

  };

  //make http request

  const httpReq = http.request(options , httpRes => {
    console.log('statusCode : ${httpRes.statusCode}');

    var buff = ''
    httpRes.on('data' , chunks => {
      buff += chunks
    });

    httpRes.on('end' , () => {
      res.render('dashboard' , JSON.parse(buff));
    })
  })

  httpReq.on('error' , error => {
    console.error(error)
  })
})

module.exports = router;
