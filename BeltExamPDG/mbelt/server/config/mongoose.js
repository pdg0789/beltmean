let mongoose = require('mongoose');
let fs = require('fs');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mbelt12047', {useMongoClient: true});

let models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
  if(file.includes('.js')){
    console.log(`loading ${file}...`)
    require(`${models_path}/${file}`);
  }
})
