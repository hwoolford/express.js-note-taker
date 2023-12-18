const express = require('express');
const path = require('path');

const notesAPI = require('./routes/notesAPI.js')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notesAPI);

app.use(express.static('public'));

// HTML get routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// Listener to start the server on the port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

