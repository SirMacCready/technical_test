const { render } = require('ejs');
const express = require('express');
const path = require('path');
const DBConnect = require('./src/Data/DataBase')

const app = express();
const port = 3000; // Choose a port for your API

// Middleware for JSON parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));


// Route handler for the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/api/products', async (req, res) => {
    try {
        const results = await DBConnect();
        res.json(results);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
