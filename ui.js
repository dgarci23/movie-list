class UI {
    constructor() {
        this.table = document.getElementById('table-body');

        this.movieCount = 0;
    }

    addMovie(movie) {

        let iconClass;
        if (movie.watchDavid === false) {
            iconClass = "fas fa-eye";
        } else {
            iconClass = "fas fa-eye-slash";
        }

        const tableBody = document.getElementById('table-body');

        const row = `<tr id="${this.movieCount}">
                        <td>${movie.title}</td>
                        <td>${movie.director}</td>
                        <td>${movie.year}</td>
                        <td>
                            <a href="" id="watch-box-${this.movieCount}"><i class="${iconClass} icon"></i></a>
                        </td>
                    </tr>`;
        
        tableBody.innerHTML += row;

        this.movieCount += 1;
    }

    filterMovie(search) {

        let title;

        for (let i = 0; i < this.movieCount; i++){

            let movieRow = document.getElementById(`${i}`);

            if (movieRow === null) {
                continue;
            } else {

                let movieTitle = movieRow.firstElementChild.textContent;

                if (!movieTitle.startsWith(search)) {
    
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

        if(icon.classList.contains("fa-eye")) {
            icon.classList.add("fa-eye-slash");
            icon.classList.remove("fa-eye")
        } else {
            icon.classList.add("fa-eye");
            icon.classList.remove("fa-eye-slash");
        }
    }
}