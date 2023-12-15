const notes = require('express').Router();



notes.get('/api/notes', (req, res) =>
  res.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


module.exports = notes;