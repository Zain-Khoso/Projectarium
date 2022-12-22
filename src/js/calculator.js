const exp = document.getElementById("expresion");
const btns = document.querySelectorAll(".button");
const allowedCh = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "+",
    "-",
    "*",
    "/",
];
const operators = allowedCh.slice(11);

function clickHandler(btn) {
    if (allowedCh.includes(btn)) {
        exp.value += btn;
    } else if (btn === "X") {
        exp.value += "*";
    } else if (btn === "<--") {
        let input = [...exp.value];
        input.pop();
        exp.value = input.join("");
    } else if (btn === "AC") {
        exp.value = "";
    } else checkIssues(exp.value);
}

function checkIssues(data) {
    if (data.trim() === "") return;

    let alphaPresence = [...data].every((elem) => allowedCh.includes(elem));

    if (alphaPresence) {
        try {
            exp.value = eval(data);
        } catch (err) {
            alert("Syntax Error");
            exp.value = "";
        }
    } else {
        alert("Only Numbers & an Operator are allowed.");
        exp.value = "";
    }
}

btns.forEach((elem) =>
    elem.addEventListener("click", () => {
        clickHandler(elem.textContent.trim());
    })
);
