const router = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
// const notesDB = require('../db/db.json')
const notesDBPath = path.join(__dirname, '../db/db.json');

router.get('/api/notes', (req, res) => {
  fs.readFile(notesDBPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post('/api/notes', (req, res) => {
  console.log(req.body);
  const { title, text, id } = req.body;
  if (req.body) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    readAndAppend(newNote, notesDBPath);
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

module.exports = router;