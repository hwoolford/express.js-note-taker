const express = require('express');
const { readFile, writeFile } = require('fs').promises;
// const { readFile, writeFile } = require('fs/promises');

const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

// clog here?

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));






app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

