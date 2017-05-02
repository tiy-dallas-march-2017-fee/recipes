'use strict';

const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));


// Answer API requests.
app.get('/api', function (req, res) {

  var ingredients = '';
  if (req.query.i !== undefined) {
    ingredients = req.query.i;
  }

  let url = `http://recipepuppy.com/api/?q=${req.query.q}&i=${ingredients}`;

  request.get({
      url: url,
      json:true
    },
    function (e, r, user) {
      //console.log(r)
      res.send(r.body);
    }
  );



  // res.set('Content-Type', 'application/json');
  // res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
