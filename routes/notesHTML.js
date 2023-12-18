const notesHTML = require('express').Router();
const path = require('path');


notesHTML.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

notesHTML.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

notesHTML.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);


module.exports = notesHTML;