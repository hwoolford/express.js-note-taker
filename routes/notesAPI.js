const path = require('path');
const notesAPI = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const notesDB = require('../db/db.json')

notesAPI.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, notesDB), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

notesAPI.post('/api/notes', (req, res) => {
  console.log(req.body);
  const { title, text, id } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, path.join(__dirname, notesDB));
    res.json('Note added successfully');
  } else {
    res.status(400).json('Error adding note');
  }
});

function readAndAppend(newNote, filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(filePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Note appended successfully');
    });
  });
}

module.exports = notesAPI;