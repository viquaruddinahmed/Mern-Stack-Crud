const mongoose = require('mongoose');
const URI = 'mongodb://localhost/assiettetest';

mongoose.connect(URI,{ useNewUrlParser: true })
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
