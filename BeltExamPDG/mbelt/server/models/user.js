let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, 'Name cannot be blank']
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
}, { timestamps: true});

mongoose.model('User', UserSchema);
