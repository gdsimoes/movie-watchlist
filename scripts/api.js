// API Variables and Functions

// Ideally, I should hide this API key, but since I am only using
// browser JavaScript for this project, the key would be exposed anyway.
export const apikey = "4efc850f";

export const baseUrl = "https://www.omdbapi.com/";
export const moviesSection = document.querySelector("#movies");
// I used a set to avoid repeated movies
export const listOfMovies = new Set(
    JSON.parse(localStorage.getItem("listOfMovies"))
);

export function updateLocalStorage(listOfMovies) {
    localStorage.setItem("listOfMovies", JSON.stringify([...listOfMovies]));
}

export function watchlistInitial() {
    moviesSection.classList.add("movies-start");
    moviesSection.innerHTML = `
        <h2>Your watchlist is looking a little empty...</h2>
        <a href="index.html">
            <svg>
                <use xlink:href="images/icons.svg#plus"></use>
            </svg>
            Let's add some movies!
        </a>
    `;
}

export function removeMovie(imdbID, movie) {
    movie.style.opacity = 0;
    // Disable whole article
    movie.style.pointerEvents = "none";
    setTimeout(() => {
        if (listOfMovies.size === 1) {
            listOfMovies.clear();
            watchlistInitial();
        } else {
            listOfMovies.delete(imdbID);
            movie.remove();
        }
        updateLocalStorage(listOfMovies);
    }, 500);
}
