const output = document.getElementById("output");

async function qotGen() {
    let data;

    try {
        data = await (
            await fetch("https://animechan.vercel.app/api/random")
        ).json();
        output.textContent = `"${data["quote"]}", ~~${data["character"]}~~. From ${data["anime"]}`;
    } catch (err) {
        alert("Sorry, Some Error occured.");
        return;
    }
}

document.getElementById("generate").addEventListener("click", qotGen);
