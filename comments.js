// create a web server
const express = require('express');
const app = express();

// create a route
app.get('/comments', (req, res) => {
  res.send('This is the comments page.');
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});