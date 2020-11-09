const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.static(__dirname + '../client/public'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('./routes')(app);
//exports = module.exports = app;

mongoose.connect('mongodb://localhost:27017/webportalapp');

mongoose.connection.on('connected', function() {
    console.log("connected to database");
});


const port = process.env.port || 3030;
app.listen(port, function(req, res) {
    console.log("Server Started Successfully");
});
    
module.exports = app;