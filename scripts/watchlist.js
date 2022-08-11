import createMovieArticle from "./createMovieArticle.js";
import { moviesSection, listOfMovies } from "./api.js";

async function populateMovies() {
    if (listOfMovies.size !== 0) {
        moviesSection.classList.remove("movies-start");
        moviesSection.replaceChildren();
        for (const imdbID of listOfMovies) {
            await createMovieArticle(imdbID, "watchlist");
        }
    }
}

populateMovies();
