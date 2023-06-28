// DOM Selections
const model = document.getElementById("model");
const model_header_text = document.getElementById("model-header-text");
const model_body_text = document.getElementById("model-body-text");
const close_model_btns = Array.from(
    document.querySelectorAll(".model-close-btn")
);
const question_field = document.getElementById("question-field");
const score_elem = document.getElementById("score-elem");
const answer_field = document.getElementById("answer-field");
const answer_btn = document.getElementById("answer-btn");

// Program Variables
let score = 10;
let question;

// Functions
const showModel = function (text, mode) {
    if (mode.toLowerCase() === "progress") {
        model_header_text.classList.remove("text-red-500");
        model_header_text.classList.add("text-green-500");
        model_header_text.textContent = "Progress";
    } else {
        model_header_text.classList.remove("text-green-500");
        model_header_text.classList.add("text-red-500");
        model_header_text.textContent = "Alert";
    }
    model_body_text.textContent = text;
    model.classList.remove("hidden");
};
const askNewQuestion = function () {
    question = Math.floor(Math.random() * 101);
    question_field.value = question;
};
const refreshScoreElem = function () {
    score_elem.textContent = score;
};
const checkAnswer = function () {
    let guess = answer_field.valueAsNumber;

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        showModel(
            "Your guess must be a valid number. Within the range of 0 - 101 excluding.",
            "alert"
        );
        return;
    }

    if (guess === question) {
        showModel(
            `Congrets, You win! The answer was indeed ${guess}. Your score is ${score}. \n The game has been restarted, so go for another round.`,
            "alert"
        );
        score = 10;
        refreshScoreElem();
        askNewQuestion();
        return;
    } else if (guess + 10 < question) {
        showModel("Go higher by more than 10 numbers", "progress");
        --score;
        refreshScoreElem();
    } else if (guess < question) {
        showModel("Go higher by less than 10 numbers", "progress");
        --score;
        refreshScoreElem();
    } else if (guess - 10 > question) {
        showModel("Go lower by more than 10 numbers", "progress");
        --score;
        refreshScoreElem();
    } else if (guess > question) {
        showModel("Go lower by less than 10 numbers", "progress");
        --score;
        refreshScoreElem();
    }
};

// Event Listeners
close_model_btns.forEach((elem) => {
    elem.addEventListener("click", () => {
        model.classList.add("hidden");
    });
});
answer_btn.addEventListener("click", checkAnswer);

// Default Function calls
askNewQuestion();
