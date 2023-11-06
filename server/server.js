const { render } = require('ejs');
const express = require('express');
const path = require('path');
const app = express();
const port = 5000; // Choose a port for your API

const APIRoute = require("./routes/API");
// Middleware for JSON parsing

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/src')));


app.use(express.static(path.join(__dirname,"/src")));


// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join('index.html'));
});
app.get('/ProductPage', (req, res) => {
  redirect("/ProductPage")
});
app.use("/API", APIRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
