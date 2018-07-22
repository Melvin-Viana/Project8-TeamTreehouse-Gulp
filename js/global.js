/*This creates a web server and inserts public files into webserver and runs index.html*/
const express = require('express');
const app = express();
var fs = require("fs");

app.use(express.static('dist'));

app.listen(process.env.PORT || 8000,()=> {console.log('All is ok!');

});