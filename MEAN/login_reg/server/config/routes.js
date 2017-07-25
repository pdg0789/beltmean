//needs all the controllers
let Users = require('../controllers/users');

module.exports = function(app){
  app.get('/', Users.new);
  app.post('/users', Users.create);
  app.post('/sessions', Users.authenticate);
}
