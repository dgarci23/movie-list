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

// home page
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

// load all the movies
app.get('/load', (req, res) => {

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

app.post("/add", (req, res) => {

    let moviesJson = fs.readFileSync("movies.json");

    moviesJson = JSON.parse(moviesJson);    

    const newMovie = {
        id: moviesJson[moviesJson.length - 1].id + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        watchDavid: false,
        watchDaniela: false,
        tags: []
    };

    moviesJson.push(newMovie);

    fs.writeFile("movies.json", JSON.stringify(moviesJson), () => console.log("Movie added to file"));

    res.send(JSON.stringify(newMovie));
})

// listen
app.listen(process.env.PORT || 3000, () => console.log("Server connected."));

