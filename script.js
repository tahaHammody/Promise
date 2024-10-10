class Movie {
    constructor(title, releaseDate, picture, rating) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.picture = picture;
        this.rating = rating;
    }

    getTitle() {
        return this.title;
    }

    getReleaseDate() {
        return new Date(this.releaseDate).toLocaleDateString();
    }

    getPicture() {
        return `https://image.tmdb.org/t/p/original/${this.picture}`;
    }

    getRating() {
        return this.rating;
    }
}

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const getHttpOptions = () => ({
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmIyZDgwMTZkYjM0NWMzZDlkY2E5NjI1NTE2Y2EzOSIsIm5iZiI6MTcyODU3MDQzNC4yNzE3NzUsInN1YiI6IjY3MDdlMzZhMjAwYjUzODhiNTU2M2E0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._GVrHFGSrpsKaCCxALZdszUFjlSQUgjpt7-8q33MOPE'
    }
});

function fetchMovies() {
    fetch(`${API_BASE_URL}movie/popular?language=en-US&page=1`, getHttpOptions())
        .then(response => {
            console.log(response); 
            if (!response.ok) {
                throw new Error(`Failed to fetch movies. Status: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            data.results.forEach(item => {
                const movie = new Movie(
                    item.title,
                    item.release_date,
                    item.poster_path || item.backdrop_path,
                    item.vote_average
                );
                createMovieCard(movie);
            });
            updateItemCount();
        })
        .catch(error => {
            console.error(error);
            createErrorMessage('Unable to fetch movies. Please try again later.');
        });
}

function createMovieCard(movie) {
    const target = document.querySelector('.movies-list');
    target.innerHTML += `
        <div class="movie">
            <img class="vector-img" src="./images/Vector.svg">
            <a href="#">
                <img class="poster-img" src="./images/tabler-icon-plus.svg">
            </a>
            <img class="poster" src="${movie.getPicture()}" alt="${movie.getTitle()} Poster">
            <div class="movie-info">
                <h3 class="title">${movie.getTitle()}</h3>
                <p class="release-date">${movie.getReleaseDate()}</p>
                <div class="rate-trailer">
                    <div class="rating">
                        <p>${movie.getRating()} / 10</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateItemCount() {
    const itemCountElement = document.querySelector('.sort-bar p');
    const movieCount = document.querySelectorAll('.movie').length;
    itemCountElement.textContent = `${movieCount} items`;
}

function createErrorMessage(message) {
    const target = document.querySelector('.movies-list');
    target.innerHTML = `<p class="error-message">${message}</p>`;
}

fetchMovies();
