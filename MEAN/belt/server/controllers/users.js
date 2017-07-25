let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports= {
  session: function(req, res){
    if(req.session.iser_id){
      return res.json({
        status: true,
        user_id: req.session.user_id
      })
    }
    return res.json({ status: false})
  },
  index: function(req, res){
    User.find({}, function(err, users){
      if (err){
        return res.json(err);
      }
      return res.json(users);
    })
  },
  create: function(req, res){
    User. create(req.body, function(err, user){
      if(err){
        return res.json(err);
      }
      req.session.user_id = user._id;
      return res.json(user);
    })
  },
  show: function(req, res){
    User.findById(req.params.id, function(err, user){
      if(err){
        return res.json(err);
      }
      return res.json(user);
    })
  },
  authenticate: function(req, res){
    User.findOne({ name: req.body.name}, function(err, user){
      if(err){
        return res.json(err);
      }
      return res.json({
        errors: {
          login:{
            message: 'Invalid credentials'
          }
        }
      })
    })
  },
  logout: function(req, res){
    if(req.session.user_id){
      delete req.session.user_id
    }
    return res.json({status: true})
  }
}
