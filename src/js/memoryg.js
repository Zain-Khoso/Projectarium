const attempts = document.getElementById("attempts");
const score = document.getElementById("score");
const imgs = document.querySelectorAll('.animal-img')
const cldImgs = [];
const imgPaths = []
let scr = 0;
let trys = 2;
let atmpts = 3;


Array.prototype.setupPaths = function () {
    this.push('/assets/imgs/g_pics/cat.png')
    this.push('/assets/imgs/g_pics/cat.png')
    this.push('/assets/imgs/g_pics/dog.jpg')
    this.push('/assets/imgs/g_pics/dog.jpg')
    this.push('/assets/imgs/g_pics/lion.png')
    this.push('/assets/imgs/g_pics/lion.png')
}
Array.prototype.random = function () {
    return this.splice(Math.floor(Math.random() * this.length), 1)[0]
}

function newGame() {
    imgPaths.setupPaths()

    imgs.forEach(elem => {
        elem.src = imgPaths.random()
    })
}

function imgSetup(node) {
    node.classList.add("g-img");
    cldImgs.push(node);
    --trys;
}

function resetImgs() {
    cldImgs.forEach((elem) => {
        elem.classList.remove("g-img");
    });
    cldImgs.pop();
    cldImgs.pop();
    trys = 2;
    --atmpts;
    attempts.textContent = `Attempts: ${atmpts}`;
}

function resetGame(msg = "good") {
    cldImgs.forEach((elem) => {
        elem.classList.remove("g-img");
    });
    cldImgs.pop();
    cldImgs.pop();
    trys = 2;
    atmpts = 3;
    attempts.textContent = `Attempts: ${atmpts}`;

    setTimeout(newGame, 1000)


    if (msg === "good") {
        ++scr;
        score.textContent = `Score: ${scr}`;
        return;
    }
    scr = 0;
    score.textContent = `Score: ${scr}`;
}

function eventHandler(node) {
    if (atmpts > 1) {
        if (trys > 1) {
            imgSetup(node);
        } else {
            if (cldImgs[0] == node) {
                alert("Don't try to be smart, just play the game.");
                return;
            }
            imgSetup(node);

            if (cldImgs[0].src === cldImgs[1].src) {
                setTimeout(() => {
                    alert("Great, You Won");
                    resetGame();
                }, 100);
            } else {
                setTimeout(() => {
                    resetImgs();
                    alert(
                        `You Lost, but don't worry you have ${atmpts} Attempts Left.`
                    );
                }, 100);
            }
        }
    } else {
        if (trys > 1) {
            imgSetup(node);
        } else {
            if (cldImgs[0] == node) {
                alert("Don't try to be smart, just play the game.");
                return;
            }
            imgSetup(node);

            if (cldImgs[0].src === cldImgs[1].src) {
                setTimeout(() => {
                    alert("Great, You Won");
                    resetGame();
                }, 100);
            } else {
                setTimeout(() => {
                    resetGame("bad");
                    alert("You Lost, Better luck next time");
                }, 100);
            }
        }
    }
}

newGame()

document.querySelectorAll(".imgBtn").forEach((elem) => {
    elem.addEventListener("click", () => eventHandler(elem.firstElementChild));
});
