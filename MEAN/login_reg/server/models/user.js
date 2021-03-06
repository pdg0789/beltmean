let mongoose = require('mongoose');
let bcrypt=require('bcryptjs');

let UserSchema = new mongoose.Schema({
  first_name:{
    type: String,
    //validations
    required: [true, 'Name cannot be blank']
  },
  last_name:{
    type: String,
    //validations
    required: [true, 'Name cannot be blank']
  },
  email:{
    type: String,
  },
  password:{
    type: String,
  },
  password_conf:{
    type: String,
  }
}, {timestamps: true});

UserSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
})

UserSchema.methods.authenticate= function(password){
  return bcrypt.compareSync(password, this.password)
}

mongoose.model('User', UserSchema);
