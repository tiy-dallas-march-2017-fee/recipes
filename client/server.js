'use strict';

let express = require('express');
let app = express();

app.get('/api/pants', function(req, res) {
  res.send({
    hi: 'pants'
  });
});

app.listen(5001, function() {
  console.log('Listening on port 5001.');
});
