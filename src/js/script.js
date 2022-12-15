document.querySelectorAll('.navMenuBtn').forEach((elem) => {
    elem.addEventListener("click", () => {
        document.getElementById('navMenu').classList.toggle('nav-menu-state')
    })
})