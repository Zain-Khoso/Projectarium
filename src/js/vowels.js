const result = document.getElementById("resultNode");
const btn = document.getElementById("newVerseBtn");
const input = document.getElementById("newVerse");

let alphabet;
let vowels;

async function dataFetch() {
    try {
        let data = await (await fetch("/assets/data/vowels.json")).json();
        alphabet = Array.from(data["Alphabet"]);
        vowels = Array.from(data["Vowels"]);
    } catch (err) {
        alert(
            "Sorry we are having a problem right now, please come back later."
        );
    }
}

function getVowels() {
    if (input.value.trim() === "") {
        alert("You have to atleast specify one letter.");
        return;
    }
    let alphas = [];
    let vols = [];
    Array.from(input.value).forEach((elem) => {
        if (alphabet.includes(elem.toLowerCase())) alphas.push(elem);
        return;
    });
    alphas.forEach((elem) => {
        if (vowels.includes(elem.toLowerCase())) vols.push(elem);
        return;
    });
    result.textContent = `The Sentence Contains ${
        alphas.length
    } Alphabets, from which ${vols.length}(${vols.join(", ")}) are Vowels.`;
}

dataFetch().then(() => {
    btn.addEventListener("click", getVowels);
});
