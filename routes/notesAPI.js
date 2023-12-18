const notesAPI = require('express').Router();
const notes = require('./db/db.json');


notesAPI.get('/api/notes', (req, res) =>
  res.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


module.exports = notesAPI;