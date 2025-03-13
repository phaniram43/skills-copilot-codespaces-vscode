// create a web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./comment');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect('mongodb://localhost/comment');

// Create a comment
app.post('/comment', function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: 'Comment added!' });
    }
  });
});

// Get all comments
app.get('/comment', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.send(err);
    } else {
      res.json(comments);
    }
  });
});

// Get one comment
app.get('/comment/:id', function(req, res) {
  Comment.findOne({_id: req.params.id}, function(err, comment) {
    if (err) {
      res.send(err);
    } else {
      res.json(comment);
    }
  });
});

// Update a comment
app.put('/comment/:id', function(req, res) {
  Comment.findOne({_id: req.params.id}, function(err, comment) {
    if (err) {
      res.send(err);
    } else {
      for (prop in req.body) {
        comment[prop] = req.body[prop];
      }
      // save the comment
      comment.save(function(err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: 'Comment updated!' });
        }
      });
    }
  });
});

// Delete a comment
app.delete('/comment/:id', function(req, res) {
  Comment.remove({_id: req.params.id}, function(err, comment) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Comment deleted!' });
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});