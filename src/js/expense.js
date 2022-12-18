const name = document.getElementById("name");
const amnt = document.getElementById("amount");
const date = document.getElementById("date");
const btn = document.getElementById("button");
const list = document.getElementById("list");

function listItem(exname, examount, exdate) {
    let node = document.createElement("li");
    node.classList = "flex justify-evenly bg-orange-400 my-4";
    node.innerHTML = `
        <h1 class="w-1/3 md:text-xl overflow-hidden mx-2">${exname}</h1>
        <h1 class="w-1/3 md:text-xl overflow-auto mx-2">${examount}</h1>
        <h1 class="w-1/3 md:text-xl overflow-hidden mx-2">${exdate}</h1>
        `;
    list.appendChild(node);
}

btn.addEventListener("click", () => {
    listItem(name.value, amnt.value, date.value);
    name.value = ''
    amnt.value = ''
    date.value = ''
});
