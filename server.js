var express = require('express');
var app = express();
const config = require('config');
const mongoose = require('mongoose');
var path = require('path');
// var passport = require('passport');
// require('./passport')(passport);
const orders = require('./routes/orders');
const users = require('./routes/users');
const clients = require('./routes/clients');
const auth = require('./routes/auth');
const partners = require('./routes/partners');
const subscription_plans = require('./routes/subscription_plans');
// console.log(config.get('jwtPrivateKey'),'==============')
// if(!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//   process.exit(1);
// }

mongoose.connect('mongodb://localhost/waterWatcher')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB', err));

// var http = require('http').Server(app);
// var cors = require('cors')
// ///const fs = require('fs');
// const io = require("socket.io")(http, {
//   cors: {
//     // origin: "http://mylagrolara.1wayit.com",
//     origin: "http://127.0.0.1:8000",
//     methods: ["GET", "POST"]
//   }
// });
// const io = require("socket.io")(http);
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/clients', clients);
app.use('/api/partners', partners);
app.use('/api/subscription_plans', subscription_plans);

var port = process.env.PORT || 2222;
app.listen(port, function(){
  console.log('listening on testing*:'+ port);
});

//require('./socket')(io);



 