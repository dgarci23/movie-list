require("dotenv").config();
// Add node modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
const { type } = require('os');

const mongoose = require("mongoose");


// Start express app
const app = express();

// node configuration
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

console.log(process.env.DB_PASSWORD);

mongoose.connect(`mongodb+srv://dgarci23:${process.env.DB_PASSWORD}@cluster0.vovxs.mongodb.net/Movies?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    watchDaniela: Boolean,
    watchDavid: Boolean,
    tags: [String]
})

const Movie = new mongoose.model("Movie", movieSchema);

// home page
app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

// load all the movies
app.get('/load', (req, res) => {
    
    Movie.find({}, (err, movies)=>{
        
            res.send(movies);

    });

});

// edit a movie
app.use(express.json());
app.post("/edit", (req, res) => {

    const changeId = req.body.id;
    const changeStatus = req.body.status;

    Movie.updateOne({_id: changeId}, {watchDavid: changeStatus}, (err, foundMovie) => {
        if (!err) {
            console.log("Movie edited succesfully.");
        }
    });

    res.send(JSON.stringify({body: "Success"}));
});

app.post("/add", (req, res) => {

    const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        watchDavid: false,
        watchDaniela: false,
        tags: []
    });

    newMovie.save();

    res.send(JSON.stringify(newMovie));
});

app.post("/delete", (req, res) => {

    const deleteId = req.body.id;

    Movie.deleteOne({_id: deleteId}, (err)=>{
        if (!err) {
            console.log("Movie deleted.");
        }
    });

    res.send(JSON.stringify({status: "success"}));
})

// listen
app.listen(process.env.PORT || 3000, () => console.log("Server connected."));

