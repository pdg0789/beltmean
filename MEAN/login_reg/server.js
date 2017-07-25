let express = require('express');
let bp = require('body-parser');

let app = express();

app.use(express.static(__dirname +'/client/static'));
app.use(bp.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', __dirname +'/client/views');

//get mongoose connect file
require('./server/config/mongoose');

//get routing file
require('./server/config/routes')(app);

app.listen(8000, function(){
  console.log("listening on port 8000");
})
