
// const ui_module = require('./ui.js');
const fs = require('fs');
const express = require('express');

// const ui = new ui_module.UI();

const app = express();

app.set("view engine", "ejs");


app.get('/', (req, res) => {


    let moviesJson = fs.readFileSync("movies.json");

    moviesJson = JSON.parse(moviesJson);

    res.render('index', {movies: moviesJson});

    console.log(localStorage);

});

app.post('the_trial_of_the_chicago_7', (req, res) => console.log("WORKED"));

app.listen(process.env.PORT || 3000);

