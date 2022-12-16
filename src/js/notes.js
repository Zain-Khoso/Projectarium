const nNWin = document.getElementById("newNote-win");
let noteName;
let noteText;

function newNote() {
    noteName = document.getElementById('newNoteName').value.trim()
    noteText = document.getElementById('newNoteText').value.trim()
    
    if (noteName === '' || noteText === '') {
        alert('Name & Note, Both must be given.')
        return
    }

    new innerHTMLGen().notePreview(noteName, noteText)

    document.getElementById('newNoteName').value = ''
    document.getElementById('newNoteText').value = ''
    
    nNWin.classList.toggle("new-note");
}

function fullview(node) {
    let note = node.previousElementSibling.textContent.trim()
    let title = node.previousElementSibling.previousElementSibling.textContent.trim()
    new innerHTMLGen().noteFullview(title, note)
}

function innerHTMLGen() {
    this.notePreview = function (name, note) {
        let node = document.createElement("div");
        node.classList = "bg-green-400 w-36 h-28 rounded-xl p-1 text-center m-4";
        node.innerHTML = `
        <h1 class="text-xl text-black font-mono border-b p-2">
            ${name}
        </h1>

        <p hidden> ${note} </p>
        <button
        class="text-white bg-blue-600 text-xl p-2 rounded-xl my-2"
        onclick="fullview(this)">
            View
        </button>
        <button
        class="text-white bg-red-500 text-xl p-2 rounded-xl my-2"
        onclick="this.parentElement.remove()">
            Delete
        </button>
        `;
        document.getElementById('noteContainer').appendChild(node)
    };

    this.noteFullview = function (name, note) {
        let node = document.createElement('div')
        node.classList = 'fixed top-24  w-full h-96 bg-emerald-500 rounded-2xl z-10 p-2 sm:top-44'
        node.innerHTML = `
            <h1 class="text-4xl text-black text-center border-b py-3">
                ${name}
            </h1>
            <div class="w-full h-full flex flex-col mt-4">
                <h1
                    class="w-full h-52 text-2xl text-black text-center border py-3 overflow-auto">
                    ${note}
                </h1>
                <div class="flex justify-evenly mt-6">
                    <button
                        class="w-2/5 h-fit p-2 bg-lime-500 text-2xl rounded-full"
                        onclick="this.parentElement.parentElement.parentElement.remove()">
                        Hide
                    </button>
                </div>
            </div>
        `
        document.body.appendChild(node)
    }
}

document.querySelectorAll(".add-note-toggle").forEach((elem) => {
    elem.addEventListener("click", () => {
        nNWin.classList.toggle("new-note");
    });
});
document.getElementById('addNewNoteBtn').addEventListener("click", newNote)