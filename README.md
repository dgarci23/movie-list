# movie-list

## What is this project about?
Simple full-stack web development project that allows the user to keep track of the movies he has watched and the movies he wants to watch in the future. The webpage allows adding new movies, removing movies, filtering by year of release and change the status if viewed or not.

## What technologies were used in this project?
The Frontend of the project is made completely using JavaScript, HTML and CSS/Bootstrap. For the Backend, the route handling is done with Express and the database management with Mongoose. MongoDB database with movie information is hosted in AtlasCloud.

## Project Description
The goal of this section is to provide an explanation of how the different technologies are combined to form a functioning project. This is suppossed to be an in-depth description of the codebase, and it might not be suitable for skimming over the project. More visitor-friendly content will be updated for this repo and moved around to facilitate interacting with the project.

### `app.js`
This is the heart of the project. This code file describes the NodeJS Express backend. It starts by adding the `dotenv` for environment variables, express, body-parser and mongoose for MongoDB database interactions. We then indicate where our static files will be located (`public`) and connect to the MongoDB server. 

To use mongoose, you need to define a Schema, which matches the different database fields to the type of data it will hold. After defining the Schema you can create a model based on that Schema. You can use the Schema to interact with the MongoDB database in different ways.

For Express, you need to define the different routes your backend will serve. For this project the routes are basic. We wanted to serve the main html file, get all the movies, edit movies, add movies and delete movies.

### `ui.js`
For the UI, created a static JS file with a UI class that will contain all the UI methods to separate them from the other JS functionality. We will do an overlook of the used methods and point out any interesting lines of code. The first method is for adding movies, it just adds HTML code to the table HTML element containing all the movies. The next one filters the movie based on the search bar, grabbing all the rows, looping through them and checking if the title or director matched the input field. If it did I used a CSS class to hide or show the movie in the table. The next method is to switch the checked and unchecked icons. The next method is the dashboard, updating the counter and percentage progress. The last method was used to delete movies.

### `index.js`
Following the same dynamic as before, the first thing to point out is the event listener on the DOM loading, getting all the movies from the backend and also updating the dashboard metrics. The next event listener was on the input bar for the filter, which just called the UI method for searching. The next event listener was on clicking the boxes next to the movie. This method requiring updating the UI (both movie row and dashboard) as well as editing the database. Editing movies is basic, just sending a post request to the backend. Adding movies is a little bit more complex, requires creating the new movie object, sending the data to the database and rendering the new movie row. Deleting movies is similar to the functionality mentioned before. Sorting the movies by release date does require defining the different criteria (ascendent or descendent) and sorting the movie object containing all the movies displayed in the frontend.
