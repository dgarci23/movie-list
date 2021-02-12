class UI {
    constructor() {
        this.table = document.getElementById('table-body');
    }

    addMovie(movie) {

        let iconClass;
        if (movie.watchDavid === false) {
            iconClass = "fas fa-lg fa-square";
        } else {
            iconClass = "fas fa-lg fa-check-square";
        }

        const row = `<tr id="${movie.id}">
                        <td>${movie.title}</td>
                        <td class="director">${movie.director}</td>
                        <td class="year">${movie.year}</td>
                        <td>
                            <a href="#" id="watch-box-${movie.id}"><i class="${iconClass} icon"></i></a>
                        </td>
                    </tr>`;
        
        this.table.innerHTML += row;
    }

    filterMovie(search) {

        let movieCount = document.querySelectorAll("tr").length;        

        for (let i = 0; i < movieCount; i++){

            let movieRow = document.getElementById(`${i}`);

            if (movieRow === null) {
                continue;
            } else {

                let movieTitle = movieRow.firstElementChild.textContent;

                if (!movieTitle.toLowerCase().includes(search.toLowerCase())) {
    
                    movieRow.classList.add("d-none");
    
                } else {

                    if (movieRow.classList.contains("d-none")) {
                        
                        movieRow.classList.remove("d-none");

                    }

                }
            }


        }

    }

    switchIcon(icon) {

        if(icon.classList.contains("fa-check-square")) {
            icon.classList.add("fa-square");
            icon.classList.remove("fa-check-square")
        } else {
            icon.classList.add("fa-check-square");
            icon.classList.remove("fa-square");
        }
    }
}