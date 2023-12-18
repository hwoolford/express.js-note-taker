const notesAPI = require('express').Router();
const notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

notesAPI.get('/api/notes', (req, res) =>
  res.sendFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

notesAPI.get('/api/notes', (req, res) =>
  res.readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);


module.exports = notesAPI;