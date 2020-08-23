const express = require('express');
const path = require('path');
const list = require('./Test JSON.json')
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, './build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    res.json(list);
    console.log('Sent list of items');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);