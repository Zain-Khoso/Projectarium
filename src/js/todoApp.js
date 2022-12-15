const btn = document.getElementById("newTaskBtn");
let task = document.getElementById("newTask");


function newItem (taskText) {
    let root = document.createElement('li')
    root.classList.value = 'w-56 h-10 bg-red-500 p-2 rounded-full my-4'
    root.innerHTML = `
        <h1 class="w-40 h-6 bg-transparent pr-2 mr-2 float-left overflow-auto">
            ${taskText}
        </h1>
        <button
            class="float-right outline-none border-l-2 pl-2 mt-1"
            onclick="this.parentElement.remove()">
            <img
                src="/assets/imgs/deco/tick.png"
                class="w-5 h-5" />
        </button>
    `
    document.getElementById('list').appendChild(root)
    task.value = ''
}

function addTask() {
    if (task.value.trim() == '') {
        alert('Please Specify a task.')
        return
    }
    newItem(task.value)
}

btn.addEventListener("click", addTask);
