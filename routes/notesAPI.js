const router = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { writeToFile } = require('../../UNH-VIRT-FSF-PT-09-2023-U-LOLC/11-Express/01-Activities/28-Stu_Mini-Project/Main/helpers/fsUtils');
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

// router.delete('/api/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     fs.readFile(notesDBPath)
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//         const result = json.filter((note) => note.id !== noteId);

//         fs.writeToFile(notesDBPath, result);

//         res.json(`Item ${id} has been deleted.`)
//     });
// });

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const json = JSON.parse(fs.readFileSync(notesDBPath));
    const result = json.filter((note) => note.id !== noteId);
    fs.writeFileSync(notesDBPath, JSON.stringify(result));
    res.json(`Item ${noteId} has been deleted.`);
  });

module.exports = router;