import {
    apikey,
    baseUrl,
    moviesSection,
    listOfMovies,
    watchlistInitial,
    removeMovie,
    updateLocalStorage,
} from "./api.js";

// const moviesSection = document.querySelector("#movies");
const standardHeight = 61;

function readBtnHandler(event) {
    const span = event.currentTarget.previousSibling;
    const p = event.currentTarget.parentElement;

    if (event.currentTarget.textContent === "Read less") {
        p.style.position = "relative";
        event.currentTarget.textContent = "Read more";

        event.currentTarget.dataset.plot = span.textContent;
        span.textContent += "...";

        while (p.scrollHeight > standardHeight) {
            span.textContent = span.textContent.slice(0, -4) + "...";
        }
    } else {
        p.style.position = "static";
        event.currentTarget.textContent = "Read less";
        span.textContent = event.currentTarget.dataset.plot;
    }
}

async function createMovieArticle(imdbID, page) {
    // DEBUG
    // const url = `${baseUrl}?apikey=${apikey}&i=${imdbID}&plot=full`;
    const url = `${baseUrl}?apikey=${apikey}&i=${imdbID}`;
    let data;
    try {
        const res = await fetch(url);
        data = await res.json();
    } catch (error) {
        console.error(error);
        return "";
    }

    const { Title, Runtime, Genre, Plot, Poster, Ratings } = data;

    const Value = Ratings[0]?.Value ?? "N/A/";

    let iconID, buttonText;
    if (page === "index") {
        iconID = "plus";
        buttonText = "Watchlist";
    } else {
        iconID = "minus";
        buttonText = "Remove";
    }

    const article = document.createElement("article");
    article.classList.add("movie");
    article.innerHTML = `
        <img src="${Poster}" alt="Movie poster" />
        <div class="info">
            <div class="title">
                <h1>${Title}</h1>
                <svg>
                    <use xlink:href="images/icons.svg#star"></use>
                </svg>
                ${Value.slice(0, Value.lastIndexOf("/"))}
            </div>
            <div class="details">
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <button>
                    <svg>
                        <use xlink:href="images/icons.svg#${iconID}"></use>
                    </svg>
                    ${buttonText}
                </button>
            </div>
            <p class="plot"><span>${Plot}</span></p>
        </div>
        `;

    moviesSection.append(article);

    // If the text is overflowing crop it and insert 'Read more' button
    const plot = article.querySelector(".plot");
    if (plot.scrollHeight > standardHeight) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Read less";
        button.addEventListener("click", readBtnHandler);

        plot.append(button);
        button.click();
    }

    // Watchlist button handler
    article
        .querySelector(".details > button")
        .addEventListener("click", (event) => {
            if (page === "index") {
                listOfMovies.add(imdbID);
                updateLocalStorage(listOfMovies);
            } else {
                const movie = event.currentTarget.closest(".movie");
                removeMovie(imdbID, movie);
            }
        });
}

export default createMovieArticle;
