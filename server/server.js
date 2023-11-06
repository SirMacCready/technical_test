const express = require('express');
const path = require('path');
const app = express();
const port = 5000; 
const apiRoute = require("./routes/api");


// Etablissement des routes statiques
app.use(express.static(path.join('../client/public')));
app.use(express.static(path.join('../client/src')));
app.use(express.static(path.join("./src")));


app.use("/api", apiRoute);

// Renvoie sur index.html dès qu'on arrive sur le localhost
app.get('/', (req, res) => {
  res.sendFile(path.join('index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
