"use strict";

// DOM Selections
const anime_element = document.getElementById("anime-element");
const character_element = document.getElementById("character-element");
const quote_element = document.getElementById("quote-element");
const fetch_btn = document.getElementById("fetch-btn");

// Functions
const getAQuote = async function () {
    try {
        const request = await fetch("https://animechan.xyz/api/random");
        const data = await request.json();

        anime_element.textContent = data["anime"];
        character_element.textContent = data["character"];
        quote_element.textContent = data["quote"];
    } catch (error) {
        anime_element.textContent = "ANIME";
        character_element.textContent =
            "Some Error Occured, Please try again later.";
        quote_element.textContent = "QUOTE";
    }
};

// Event Listeners
fetch_btn.addEventListener("click", getAQuote);

// default Function Calls
getAQuote();
