/*This creates a web server and inserts public files into webserver and runs index.html*/
const express = require('express');
const app = express();

app.use(express.static('dist'));

app.listen(process.env.PORT || 3000,()=> console.log('Index.html is running on localhost:3000')

);