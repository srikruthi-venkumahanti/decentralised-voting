const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/results.html'));
});

app.get('/addcandidates', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/addcandidates.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});