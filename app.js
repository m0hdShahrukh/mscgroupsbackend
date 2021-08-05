const mongoose = require('mongoose');
const { ejson } = require("ejs");
const express = require("express");
const app = express();
const path = require('path')
const fs = require("fs");
const http = require("http")
const bodyParser = require("body-parser")
const { urlencoded } = require("express");
const port = process.env.PORT || 8000;
// const hostname = '127.0.0.1';

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/images', express.static(__dirname + '/static/images'));
app.use('/javascript', express.static(__dirname + '/static/javascript'));
app.use(express.urlencoded());
app.use(express.json()); 

app.set('view engine', 'ejs') // Set the template engine as ejs
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/index.html', function(req, res) {
    res.sendFile( __dirname + "/views/index.html" ); 
});
app.get('/About.html', function(req, res) {
    res.sendFile( __dirname + "/views/About.html" ); 
});
app.get('/Contact.html', function(req, res) {
    res.sendFile( __dirname + "/views/Contact.html" ); 
});
app.get('/Form.html', function(req, res) {
    res.sendFile( __dirname + "/views/Form.html" ); 
});
app.get('/Services.html', function(req, res) {
    res.sendFile(__dirname + "/views/Services.html")
});
// app post
app.post('/contact', (req, res) => {
    let myData = new moon(req.body)
     myData.save().then(() => {
       res.sendFile(__dirname + "/views/Form.html")
     })
     .catch(() => {
       res.status(400).sendFile(__dirname + "/views/Form2.html")
     });
   });

app.engine('html', require('ejs').renderFile);
// mongoose
mongoose.connect('mongodb://localhost/mscgroups',{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected")});
    const moonSchema = new mongoose.Schema({
        name: String,
        // number: Number,
        email: String,
        // city: String,
        // age: Number,
        // gender: String
        message: String
    });
    let moon = mongoose.model('moon', moonSchema);
    // moon.find({ name: "moonform" }, function(err, myData) {
    //     if (err) return console.error(err);
    //     console.log(moon)
    // });
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
