"use strict";

// DOM Selections
const search_entry = document.getElementById("search-field");
const search_btn = document.getElementById("search-btn");
const word_element = document.getElementById("word-element");
const defination_element = document.getElementById("defination-element");

// Program Variables
const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");

// Functions
const fetchMeaning = async function () {
    const query = search_entry.value;

    if (!queryIsEligible(query)) return;

    try {
        const request = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
        );

        const data = await request.json();

        word_element.textContent = data[0]["word"];
        defination_element.textContent =
            data[0]["meanings"][0]["definitions"][0]["definition"];
    } catch (err) {
        word_element.textContent = query;
        defination_element.textContent = "This is not a valid word.";
        return;
    }
};

const queryIsEligible = function (query) {
    for (let i = 0; i < query.length; i++) {
        const character = query[i].toLowerCase();
        if (!alphabet.includes(character)) return false;
    }
    return true;
};

// Event Listeners
search_btn.addEventListener("click", fetchMeaning);
