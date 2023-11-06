const { render } = require('ejs');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Choose a port for your API

// Middleware for JSON parsing
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
