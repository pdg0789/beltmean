let express = require('express');
let bp = require('body-parser');
let session = require('express-session');
const path = require('path');

let app = express();
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(session({
  secret: 'mysecretestsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {},
}))
app.use(bp.json());

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(8000, function(){
  console.log('listening on port 8000')
})
