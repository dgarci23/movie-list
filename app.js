const api = new API();
const ui = new UI();

// Load event listeners
document.addEventListener("DOMContentLoaded", loadMoviesToLS);

document.querySelector("#searchCriteria").addEventListener("keyup", filterMovie);

document.querySelector("#table-body").addEventListener("click", switchIcon);



function loadMoviesToUI(movies) {

    movies = Array.from(movies);

    
    movies.forEach((movie) => {

        ui.addMovie(movie);
        
    });

}

function loadMoviesToLS(){

    api.get()
        .then(data => {
            let movies;
            movies = data;
            localStorage.setItem("movies", movies);

            loadMoviesToUI(movies);
        })
        .catch(err => console.log(err));

}

function filterMovie() {

    const input = document.querySelector("#searchCriteria").value;
    ui.filterMovie(input);
}

function switchIcon(e) {

    if (e.target.classList.contains("icon")){

        ui.switchIcon(e.target);

    }

    e.preventDefault();

}
