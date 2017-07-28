let mongoose = require("mongoose");
let User = mongoose.model("User");
let Appointment = mongoose.model('Appointment');

class AppointmentsController {
  index(req, res){
    Appointment.find({}).populate('user').exec((err, appointment) =>{
      if(err){ return res.json(err)}
      return res.json(appointment);
    })
  }
  create(req, res){
    Appointment.create(req.body, (err, appointment) =>{
      if(err){ return res.json(err)}
      User.findByIdAndUpdate(
        req.body.user,
        { $push: {appointments: appointment._id}},
        { new: true},
        (err, user) =>{
          if(err) { return res.json(err)}
          return res.json(appointment);
      })
    })
  }
  // show(req, res){
  //   Appointment.findById(req.params.id)
  //   .populate('user')
  //   .populate({
  //     path: 'appointments',
  //     model: 'Appointment',
  //     populate: {
  //       path: 'user',
  //       model: 'User'
  //     }
  //   })
  //   .exec((err, appointment) =>{
  //     if(err){ return res.json(err)}
  //     return res.json(appointment);
  //   })
  // }
}
module.exports = new AppointmentsController();
