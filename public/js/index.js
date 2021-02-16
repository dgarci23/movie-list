const ui = new UI();

let movies = {};

let watched = 0;

// Loads movies
document.addEventListener("DOMContentLoaded", ()=>{

    console.log("DOM loaded");

    movies = getMovies();

    movies.then(moviesData => {

        movies = moviesData;
        
        moviesData.forEach(movie => {
            ui.addMovie(movie);

            if (movie.watchDavid === true) {
                watched++;
            }
        });

        ui.dashboard(watched, movies.length);

    });
});

async function getMovies() {

    let dataExpress = await fetch("/load");

    const data = await dataExpress.json();

    return data;

}


// filter movie
document.getElementById("searchCriteria").addEventListener("input", (e) => {

    const searchFilter = document.getElementById("searchCriteria").value;

    ui.filterMovie(searchFilter);

});


// checking movies
document.getElementById("table-body").addEventListener("click", (e) => {

    if (e.target.classList.contains("checkIcon")) {

        ui.switchIcon(e.target);

        const idChangedIcon = e.target.parentNode.parentNode.parentNode.id;

        movies.forEach((movie) => {
    
            if (movie.id == idChangedIcon) {
                movie.watchDavid = !(movie.watchDavid);
            }
    
        });

        const editResponse = editMovies(movies);
        
        editResponse.then(res => console.log(res));

        e.target.classList.contains("fa-square") ? watched-- : watched++;
        ui.dashboard(watched, movies.length);
    }

});

async function editMovies(movies) {

    // console.log(movies);

    const response = await fetch("/edit", {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movies)
    });

    const resData = await response.json();
    return resData;

}

// adding a new movie
document.getElementById("btnAddMovie").addEventListener("click", addMovie);

function addMovie() {

    console.log("Button clicked");

    const title = document.getElementById("movieTitleInput").value;
    const director = document.getElementById("movieDirectorInput").value;
    const year = document.getElementById("movieYearInput").value;

    const newMovie = {
        title: title,
        director: director,
        year: year
    };
    
    // Send movie to server
    const movieAddedResponse = sendMoviesToServer(newMovie);

    let movieAdded = {};

    movieAddedResponse.then(data => {
        
        ui.addMovie(data);

        movies.push(data);

        ui.dashboard(watched, movies.length);

    });
    

}

async function sendMoviesToServer(newMovie) {

    const response = await fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovie)
    });

    const resData = await response.json();
    return resData;

}

// deleting a new movie
document.getElementById("table-body").addEventListener("click", (e) => {

    if (e.target.classList.contains("deleteIcon")) {
        const deleteId = e.target.parentNode.parentNode.parentNode.id;

        const deleteResponse = deleteMoviesFromServer(deleteId);
    
        deleteResponse.then(res => {
    
            console.log(res);
    
            ui.deleteMovie(deleteId);
    
        });
    
    }
});

async function deleteMoviesFromServer(id) {

    const response = await fetch("/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id})
    });

    const resData = await response.json();
    return resData;

}
