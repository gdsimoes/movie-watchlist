import createMovieArticle from "./createMovieArticle.js";
import { apikey, baseUrl } from "./api.js";

const input = document.querySelector("input[type='search']");
const btn = document.querySelector("#btn-search");
const moviesSection = document.querySelector("#movies");

async function search(event) {
    event.preventDefault();

    const s = input.value;
    if (s === "") return;

    const url = `${baseUrl}?apikey=${apikey}&s=${s}&type=movie`;
    let data;
    try {
        const res = await fetch(url);
        data = await res.json();
    } catch (error) {
        moviesSection.classList.add("movies-start");
        const h2 = document.createElement("h2");
        h2.textContent = "Couldn't connect to API.";
        moviesSection.replaceChildren(h2);
        console.error(error);
        return;
    }

    if (data.Response === "False") {
        moviesSection.classList.add("movies-start");
        const h2 = document.createElement("h2");
        h2.textContent = `Unable to find what you're looking for. Please try another search.`;
        moviesSection.replaceChildren(h2);
    } else {
        moviesSection.classList.remove("movies-start");
        moviesSection.replaceChildren();
        for (const movie of data.Search) {
            await createMovieArticle(movie.imdbID, "index");
            // DEBUG
            // break;
        }
    }

    // console.log(data);
    // console.log(data.Search[0].Title, data.Search[0].Year);
}

btn.addEventListener("click", search);
