const express = require('express');
const app=express();
const mongoose=require('mongoose');
const config=require('./config');
const signupModule=require('./signup');
const loginModule=require('./login');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect(config.url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

    console.log("DB Connected");

    // we're connected!

});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',"X-PINGOTHER, Content-Type, authorization");
    res.setHeader('Access-Control-Allow-Methods',"POST, GET, DELETE");
    
    next();
  });

app.use('/signup', signupModule);
app.use('/login', loginModule);

app.use('**', (req, res) => { res.send('404') });

app.listen(config.serverport, () => { console.log('Running') });