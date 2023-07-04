"use strict";

// DOM Selection
const cardsRoot = document.getElementById("cards-root");
const footer = document.getElementById("footer");

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
    thumbnail.src = `/assets/imgs/deco/hackathon_card_imgs/${data["thumbnail"]}.jpg`;
    thumbnail.alt = "Hackathon";

    containerDiv.appendChild(thumbnail);

    const bodyDiv = document.createElement("div");
    bodyDiv.classList.add("p-6");

    const hackathonHeading = document.createElement("h2");
    hackathonHeading.classList.add(
        "tracking-widest",
        "text-xs",
        "title-font",
        "font-medium",
        "text-gray-500",
        "mb-1"
    );
    hackathonHeading.textContent = data["type_"];

    bodyDiv.appendChild(hackathonHeading);

    const titleHeading = document.createElement("h1");
    titleHeading.classList.add(
        "title-font",
        "text-lg",
        "font-medium",
        "text-white",
        "mb-3"
    );
    titleHeading.textContent = data["name"];

    bodyDiv.appendChild(titleHeading);

    const details = document.createElement("p");
    details.classList.add("leading-relaxed", "mb-3");

    const startTime = document.createElement("h4");
    startTime.textContent = `From: ${data["start_time"].slice(0, 10)}`;
    details.appendChild(startTime);

    const endTime = document.createElement("h4");
    endTime.textContent = `To: ${data["end_time"].slice(0, 10)}`;
    details.appendChild(endTime);

    const status = document.createElement("h4");
    status.textContent = `Status: ${
        data["status"] === "CODING" ? "Started" : "Not yet Started"
    }`;
    details.appendChild(status);

    bodyDiv.appendChild(details);

    const footerDiv = document.createElement("div");
    footerDiv.classList.add("flex", "items-center", "flex-wrap");

    const learnMore = document.createElement("a");
    learnMore.href = data["url"];
    learnMore.classList.add(
        "text-indigo-400",
        "inline-flex",
        "items-center",
        "md:mb-2",
        "lg:mb-0"
    );
    learnMore.textContent = "Learn More";

    footerDiv.appendChild(learnMore);

    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrow.classList.add("w-4", "h-4", "ml-2");
    arrow.setAttribute("viewBox", "0 0 24 24");
    arrow.setAttribute("stroke", "currentColor");
    arrow.setAttribute("strokeWidth", "2");
    arrow.setAttribute("fill", "none");
    arrow.setAttribute("strokeLinecap", "round");
    arrow.setAttribute("strokeLinejoin", "round");

    bodyDiv.appendChild(footerDiv);

    containerDiv.appendChild(bodyDiv);

    rootDiv.append(containerDiv);

    cardsRoot.appendChild(rootDiv);
};

// IIFE to load the contents of the Page.
(async function () {
    const request = await fetch("https://kontests.net/api/v1/hacker_earth");
    const data = await request.json();

    for (let item of data) {
        item["thumbnail"] = Math.ceil(Math.random() * 13);
        createCard(item);
    }
})().then(() => {
    footer.classList.remove("hidden");
});
