const question = document.getElementById("question");
const aptQ = document.getElementById("attemptedQuestions");
const sMarks = document.getElementById("sMarks");
const lMarks = document.getElementById("lMarks");
const tQues = document.getElementById("tQues");
const options = document.getElementsByName("option");
const labels = document.querySelectorAll("label");
const btn = document.getElementById("submit");
let marks = 0;
let aQues = 0;

async function fetchList() {
    const data = await (await fetch("/assets/data/mcqs.json")).json();

    tQues.textContent = `Total_Questions: ${data.length + 1}`

    btn.addEventListener("click", () => nextQuestion(data));
}

function setupNewQuestion(ques) {
    question.textContent = ques;

    labels.forEach((label) => {
        options.forEach((option) => {
            if (option.value === "ok") {
                label.classList.remove("text-green-500");
            } else {
                label.classList.remove("text-red-500");
            }
        });
    });

    options.forEach((e) => {
        e.disabled = false;
        e.checked = false;
    });
    btn.disabled = true;
}

function nextQuestion(qList) {
    if (qList.length === 0) {
        alert(
            "Sorry, No  more questions are available. But Remember, You can come back at any time to retake the quiz."
        );
        location.reload();
        return;
    }

    let quesData = qList.shift();
    let ques = quesData.q;
    let ops = quesData.options;
    let labelIndex = 0;

    setupNewQuestion(ques);

    for (let op of ops) {
        labels[labelIndex].textContent = op.option;
        if (op.correct === "yes") {
            options.forEach((e) => {
                if (e.id === labels[labelIndex].dataset.for) {
                    e.value = "ok";
                } else {
                    e.value = "";
                }
            });
        }
        labelIndex++;
    }
}

function showAnswer() {
    labels.forEach((label) => {
        options.forEach((option) => {
            if (label.dataset.for === option.id && option.value === "ok") {
                label.classList.add("text-green-500");
            } else {
                label.classList.add("text-red-500");
            }
        });
    });
}

function check(ev) {
    let elem = ev.target;

    if (elem.value === "ok") ++marks;

    ++aQues;

    sMarks.textContent = `Marks: ${marks}/10`;
    lMarks.textContent = `Marks: ${marks}/${aQues}`;
    aptQ.textContent = `Attempted_Questions: ${aQues}`;

    showAnswer();
    options.forEach((e) => (e.disabled = true));
    btn.disabled = false;
}

options.forEach((elem) => elem.addEventListener("click", check));
fetchList();
