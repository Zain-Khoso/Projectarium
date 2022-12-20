const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const word = document.getElementById("word");
const meaning = document.getElementById("meaning");
const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    " ",
];

function validateInput(input) {
    if (input.trim() === "") {
        alert("Don't just play around give me a word to search.");
        search.value = "";
    } else if (
        Array.from(input).every((elem) => alphabet.includes(elem.toLowerCase()))
    )
        return true;
    else {
        alert("Only alphabet is allowed");
        search.value = "";
    }
}

async function searchWord() {
    let srch = search.value;
    let req;
    let data;

    if (validateInput(srch)) {
        try {
            req = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${srch}`
            );
            data = await req.json();

            word.textContent = srch;
            meaning.textContent =
                data[0]["meanings"][0]["definitions"][0]["definition"];
            search.value = "";
        } catch (err) {
            alert(`Error occured, Please check the spelling.`);
            search.value = "";
            return;
        }
    } else return;
}

async function randomWord() {
    let words;
    let data;
    let keyword;
    try {
        words = await (
            await fetch(
                `/assets/data/words/${alphabet.at(
                    Math.random() * alphabet.length
                )}.json`
            )
        ).json();

        let keyword = words.at(Math.random() * words.length);

        data = await (
            await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`
            )
        ).json();

        word.textContent = keyword;
        meaning.textContent =
            data[0]["meanings"][0]["definitions"][0]["definition"];
        search.value = "";
    } catch (err) {
        alert("Sorry some error occured. Please try again");
        search.value = "";
        return;
    }
}

searchBtn.addEventListener("click", searchWord);
randomBtn.addEventListener("click", randomWord);
