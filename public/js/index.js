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
        
        console.log(idChangedIcon);

        movies.forEach((movie) => {
    
            if (movie._id == idChangedIcon) {
                movie.watchDavid = !(movie.watchDavid);
                const editResponse = editMovies(movie._id, movie.watchDavid);
                editResponse.then(res => console.log(res));
        
                e.target.classList.contains("fa-square") ? watched-- : watched++;
                ui.dashboard(watched, movies.length);
            }
        });
    }
});

async function editMovies(id, status) {

    // console.log(movies);

    const response = await fetch(`/edit`, {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id, status: status})
    });

    const resData = await response.json();
    return resData;

}

// adding a new movie
document.getElementById("btnAddMovie").addEventListener("click", addMovie);

function addMovie() {

    console.log("Button clicked");

    let title = document.getElementById("movieTitleInput").value;
    let director = document.getElementById("movieDirectorInput").value;
    let year = document.getElementById("movieYearInput").value;

    const newMovie = {
        title: title,
        director: director,
        year: year
    };

    title = "";
    director = "";
    year = "";
    
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

            ui.dashboard(watched, movies.length);
    
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

// Filter movies
document.querySelector(".table-movie").addEventListener("click", (e) => {

    if (e.target.classList.contains("fa-sort-amount-down")){
        let moviesSort = Array.from(movies);

        moviesSort.sort(yearSortDown());

        document.getElementById("table-body").innerHTML = "";

        moviesSort.forEach((movie) => {
            ui.addMovie(movie);
        })

        e.target.classList.remove("fa-sort-amount-down");
        e.target.classList.add("fa-sort-amount-up");
    } else if(e.target.classList.contains("fa-sort-amount-up")) {
        let moviesSort = Array.from(movies);

        moviesSort.sort(yearSortUp());

        document.getElementById("table-body").innerHTML = "";

        moviesSort.forEach((movie) => {
            ui.addMovie(movie);
        })

        e.target.classList.remove("fa-sort-amount-up");
        e.target.classList.add("fa-sort-amount-down");
    }
});


// console.log(movies);

function yearSortDown(){
    return function(a, b) {
        if (a.year > b.year) {
            return 1;
        } else if (a.year < b.year) {
            return -1;
        } else {
            return 0;
        }
    }
}

function yearSortUp(){
    return function(a, b) {
        if (a.year > b.year) {
            return -1;
        } else if (a.year < b.year) {
            return 1;
        } else {
            return 0;
        }
    }
}

