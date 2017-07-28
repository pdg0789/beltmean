let mongoose = require("mongoose");

let AppointmentSchema = new mongoose.Schema({
  complaint:{
    type: String,
    required: [true, 'Complaint cannot be blank'],
    minlength:[10, 'Complaint must be at least 10 characters']
  },
  date:{
    type: Date,
  },
  time:{
    type: Date,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, { timestamps: true});

mongoose.model('Appointment', AppointmentSchema);
