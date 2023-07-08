"use strict";

// DOM Selection
const cardsRoot = document.getElementById("cards-root");

// Functions
const createCard = function (data) {
    const rootDiv = document.createElement("div");
    rootDiv.classList.add("p-4", "md:w-1/3");

    const containerDiv = document.createElement("div");
    containerDiv.classList.add(
        "h-full",
        "border-2",
        "border-gray-800",
        "rounded-lg",
        "overflow-hidden"
    );

    const thumbnail = document.createElement("img");
    thumbnail.classList.add(
        "lg:h-48",
        "md:h-36",
        "w-full",
        "object-cover",
        "object-center"
    );
    thumbnail.src = data["image"];
    thumbnail.alt = "Thumbnail";

    containerDiv.appendChild(thumbnail);

    const bodyDiv = document.createElement("div");
    bodyDiv.classList.add("p-6");

    const genreHeading = document.createElement("h2");
    genreHeading.classList.add(
        "tracking-widest",
        "text-xs",
        "title-font",
        "font-medium",
        "text-gray-500",
        "mb-1"
    );
    genreHeading.textContent = data["genre"];

    bodyDiv.appendChild(genreHeading);

    const titleHeading = document.createElement("h1");
    titleHeading.classList.add(
        "title-font",
        "text-lg",
        "font-medium",
        "text-white",
        "mb-3"
    );
    titleHeading.textContent = data["title"];

    bodyDiv.appendChild(titleHeading);

    const description = document.createElement("p");
    description.classList.add("leading-relaxed", "mb-3");
    description.textContent = data["description"];

    bodyDiv.appendChild(description);

    const footerDiv = document.createElement("div");
    footerDiv.classList.add("flex", "items-center", "flex-wrap");

    const trailerLink = document.createElement("a");
    trailerLink.href = data["trailer"];
    trailerLink.classList.add(
        "text-indigo-400",
        "inline-flex",
        "items-center",
        "md:mb-2",
        "lg:mb-0"
    );
    trailerLink.target = "_blank";
    trailerLink.textContent = "Trailer";

    footerDiv.appendChild(trailerLink);

    bodyDiv.appendChild(footerDiv);

    containerDiv.appendChild(bodyDiv);

    rootDiv.append(containerDiv);

    cardsRoot.appendChild(rootDiv);
};

(async function () {
    const url = "https://imdb-top-100-movies.p.rapidapi.com/";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "6a0da63fd6mshf947f0b5aeed0e3p14ee5ejsn262f1a525816",
            "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
        },
    };

    try {
        const request = await fetch(url, options);
        const data = await request.json();

        for (let item of data) {
            createCard(item);
        }
    } catch (error) {
        console.error(error);
    }
})();
