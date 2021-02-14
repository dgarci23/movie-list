const ui = new UI();

let movies = {};

document.querySelector(".searchCol").style = `display: none;`;
document.querySelector(".searchCol").style = `display: block;`;

// Loads movies
document.addEventListener("DOMContentLoaded", ()=>{

    console.log("DOM loaded");

    movies = getMovies();

    movies.then(moviesData => {

        movies = moviesData;
        
        moviesData.forEach(movie => ui.addMovie(movie));

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

    if (e.target.classList.contains("icon")) {

        ui.switchIcon(e.target);

        const idChangedIcon = e.target.parentNode.parentNode.parentNode.id;

        movies.forEach((movie) => {
    
            if (movie.id == idChangedIcon) {
                movie.watchDavid = !(movie.watchDavid);
            }
    
        });

        const editResponse = editMovies(movies);
        
        editResponse.then(res => console.log(res));
    }

    e.target.parentNode.preventDefault();
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