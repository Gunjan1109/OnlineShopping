const User = require('../models/user.model')
const Passhash = require('password-hash')
const Token = require('../models/token')
exports.signup = async (req, res) => {
   var user = new User({
      email: req.body.email,
      password: Passhash.generate(req.body.password),
      name: req.body.name

   })
   // var userpass = Passhash.generate(req.body.password)
   var check = await User.findOne({email : req.body.email})
   if(check){
      res.send('Email already exist')
   }
   else{
   user = await user.save()
   var token = new Token({ userid: user._id });
   token = await token.save()
   
   res.header("Authorisation", token._id)
   res.status(200).send(user)
   }
}

exports.signin = async (req, res) => {

   var user = await User.findOne({ email: req.body.email })
   console.log(user);
   if (!user) {
      res.send("Email do not exist")
   }
   else {
      console.log(Passhash.verify(req.body.password, user.password))
      if (Passhash.verify(req.body.password, user.password)) {
         res.status(200).send(user)
      }
      else {
         res.send('invalid username or password')
      }
   }

}

exports.retrieveuser = async (req, res) => {
   var token = await Token.findOne({userid : req.body.userid})
   console.log(token)
   if(!token){
      res.send('Token not found')
   }
   else{
      //res.status(200).send(token)
      var user = await User.findOne({ _id : token.userid })
      res.status(200).send(user)
   }
   //TODO
}

exports.signout = async (req, res) => {
   var token = await Token.findOne({userid : req.body.userid})
   console.log(token)
   if(!token){
      res.send('Token not found')
   }
   else{
     
      token = await token.remove()
      res.send('Sucessfully sign out')
   }
}