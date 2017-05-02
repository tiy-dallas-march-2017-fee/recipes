'use strict';

const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));


// Answer API requests.
app.get('/api', function (req, res) {

  let ingredients = '';
  if (req.query.i !== undefined) {
    ingredients = `&i=${req.query.i}`;
  }

  const url = `http://recipepuppy.com/api/?q=${req.query.q}${ingredients}`;
  console.log(`Requesting url ${url}`)

  request.get({
      url: url,
      json:true
    },
    function (err, apiRes) {
      res.send(apiRes.body);
    }
  );

});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


// Determine the port. Default to 5000 if someone doesn't supply the port via process.env.
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
