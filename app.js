// Add node modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

// Start express app
const app = express();

// node configuration
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// home page
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

// load all the movies
app.get('/load', (req, res) => {

    console.log("Trying to connect to express server");

    let moviesJson = fs.readFileSync("movies.json");

    moviesJson = JSON.parse(moviesJson);

    res.send(moviesJson);

});

// edit a movie
app.use(express.json());
app.post("/edit", (req, res) => {

    fs.writeFile("movies.json", JSON.stringify(req.body), () => console.log("File written"));

    res.send(JSON.stringify({body: "Success"}));
})


// listen
app.listen(process.env.PORT || 3000, () => console.log("Server connected."));

