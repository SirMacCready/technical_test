const express = require('express');
const path = require('path');
const app = express();
const apiRoute = require("./routes/api");
const usersRoute = require("./routes/users");
const port = 5000; 
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Etablissement des routes statiques
app.use(express.static(path.join('../client/public')));
app.use(express.static(path.join('../client/src')));
app.use(express.static(path.join("./src")));


app.use("/api", apiRoute);
app.use("/users", usersRoute);

// Renvoie sur index.html dès qu'on arrive sur le localhost
app.get('/', (req, res) => {
  res.sendFile(path.join('index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
