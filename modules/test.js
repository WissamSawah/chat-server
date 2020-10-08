// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


const kittySchema = new mongoose.Schema({
  name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);


const fluffy = new Kitten({ name: 'fluffy3' });


fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
console.log(fluffy)
;});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})
