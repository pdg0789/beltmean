let mongoose = require('mongoose');
let User = mongoose.model('User');
let bcrypt = require('bcryptjs');

module.exports = {
  new: function(req, res){
    return res.render('users/new.ejs');
  },
  create: function(req, res){
    User.create(req.body, function(err, user){
      if(err){
        console.log(err);
      }else{
        console.log('user saved')
        console.log(user)
        return res.redirect('/');
      }
    })
  },
  authenticate: function(req, res){
    //look for email
    User.findOne({email: req.body.email}, function(err, user){
      if(err){
        console.log(err);
      }
      if(user && user.authenticate(req.body.password)){
        console.log(' user authenticated and redirect to next section');
      }else{
        console.log('generate errors to send to angular')
      }
      return res.redirect('/');
    })
  }
}
