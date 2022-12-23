const input = document.getElementById("ans");
const graph = document.getElementById("graph");
let ansValue;

function reset() {
    ansValue = Math.floor(Math.random() * 100);
    graph.value = ansValue;
    input.value = "";
}

function check() {
    let ans = input.valueAsNumber;
    if (ans <= 100 && ans > 0) {
        if (ans === ansValue) {
            alert("Correct, You win.");
            reset();
        } else if (ans < ansValue) {
            if (ans + 10 < ansValue) {
                alert("Go Higher by more than 10.");
            } else {
                alert("Go Higher");
            }
        } else if (ans > ansValue) {
            if (ans - 10 > ansValue) {
                alert("Go Lower by more than 10.");
            } else {
                alert("Go Lower");
            }
        } else {
            alert("Sorry, Some Error Occured");
        }
    } else alert("Answer is within the range of 1 - 100");
    
    input.value = ''
}

document.getElementById("resetbtn").addEventListener("click", reset);
document.getElementById("checkbtn").addEventListener("click", check);

reset();
