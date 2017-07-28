let path = require('path');
let Users = require('./../controllers/users');
let Appointments = require('./../controllers/appointments');


module.exports = function(app){
  app.post('/users', Users.create);

  app.get('/appointments', Appointments.index);
  app.post('/appointments', Appointments.create);
  // app.get('/questions/:id', Questions.show);
  app.get('/new-appointment', Appointments.create);
  app.post('/new-appointment', Appointments.create);

  app.all('*', (req, res) =>{
    res.sendFile(path.resolve('./public/dist/index.html'));
  })
}
