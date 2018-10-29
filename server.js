//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ngStartupMumbai'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/ngStartupMumbai/index.html'));
});

// Start the app by listening on the default Heroku port
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
    app.use(express.static(__dirname + '/'));   
} else {
    app.use(express.static(__dirname + '/'));
}
