const express = require('express');
const router = express.Router();

let books = [];

router.get('/books', (req, res) => {
  console.log('Getting list of books');
  res.send('Here is the list of books!', books);
});

router.post('/books', (req, res) => {
  console.log('Book data:', req.body);
  books.push(req.body);
  res.send('Book has been added!');
});

module.exports = router;
