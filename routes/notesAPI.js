const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const notesDBPath = path.join(__dirname, "../db/db.json");

// Reads the existing saved notes and posts them to the page
router.get("/api/notes", (req, res) => {
  fs.readFile(notesDBPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Posting new note and appending it to the page
router.post("/api/notes", (req, res) => {
  console.log(req.body);
  const { title, text, id } = req.body;
  if (req.body) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    readAndAppend(newNote, notesDBPath);
    res.json("Note added successfully");
  } else {
    res.status(400).json("Error adding note");
  }
});

function readAndAppend(newNote, filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
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
      console.log("Note appended successfully");
    });
  });
}

// Deletes a note when trashcan is clicked based on the note's unique id
router.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const json = JSON.parse(fs.readFileSync(notesDBPath));
  const result = json.filter((note) => note.id !== noteId);
  fs.writeFileSync(notesDBPath, JSON.stringify(result));
  res.json(`Item ${noteId} has been deleted.`);
});

module.exports = router;
