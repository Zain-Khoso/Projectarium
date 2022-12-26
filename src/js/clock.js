const desktopBg = document.getElementById('desktop-bg')
const phoneBg = document.getElementById('phone-bg')
const hours = document.getElementById('hours')
const minuts = document.getElementById('minuts')
const seconds = document.getElementById('seconds')


function changeBg(h) {
    if (h > 6 && h < 18) {
        desktopBg.src = '/assets/imgs/deco/day.jpg'
        phoneBg.src = '/assets/imgs/deco/phone-day.png'
    } else {
        desktopBg.src = '/assets/imgs/deco/night.jpg'
        phoneBg.src = '/assets/imgs/deco/phone-night.png'
    }
}

function updateClock() {
    let h = new Date().getHours()
    let m = new Date().getMinutes()
    let s = new Date().getSeconds()

    changeBg(h)

    if (h > 12) h = h-12

    hours.textContent = h
    minuts.textContent = m
    seconds.textContent = s

    setInterval(updateClock, 500)
}

updateClock()