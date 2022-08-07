import { apikey, baseUrl } from "./api.js";

async function createMovieArticle(imdbID, page) {
    const url = `${baseUrl}?apikey=${apikey}&i=${imdbID}`;
    let data;
    try {
        const res = await fetch(url);
        data = await res.json();
    } catch (error) {
        console.error(error);
        return "";
    }

    const {
        Title,
        Runtime,
        Genre,
        Plot,
        Poster,
        Ratings: [{ Value }],
    } = data;

    // console.log(Title, Runtime, Genre, Plot, Value);
    // console.log("#######");

    let iconID, buttonText;
    if (page === "index") {
        iconID = "plus";
        buttonText = "Watchlist";
    } else {
        iconID = "minus";
        buttonText = "Remove";
    }

    return `
<article class="movie">
    <img src="${Poster}" alt="Movie poster" />
    <div class="info">
        <div class="title">
            <h1>${Title}</h1>
            <svg>
                <use xlink:href="images/icons.svg#star"></use>
            </svg>
            ${Value.slice(0, Value.indexOf("/"))}
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
        <p class="plot">${Plot}</p>
    </div>
</article>


    `;
}

export default createMovieArticle;
