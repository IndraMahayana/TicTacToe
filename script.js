const start = document.querySelector('.start')
const startX = document.querySelector('.playerX')
const startO = document.querySelector('.playerO')

const play = document.querySelector('.play')
const playArea = document.querySelectorAll('.a')
const players = document.querySelector('.slide')

const result = document.querySelector('.result')
const resultWon = document.querySelector('.result-won')
const resultButton = document.querySelector('.result-button')

trueBot = true
thegame = 'X'

startX.addEventListener('click', () => {
    start.classList.add('starthide')
    play.classList.add('playshow')
    players.classList.add('slide1')
})

startO.addEventListener('click', () => {
    start.classList.add('starthide')
    play.classList.add('playshow')
    players.classList.add('slide2')
})

for (let i = 0; i < playArea.length; i++) {
    playArea[i].setAttribute('onclick', 'clickedArea(this)')
}

function clickedArea(element) {
    if (players.classList.contains('slide2')) {
        element.innerHTML = `<i class="fa-solid fa-o"></i>`
        players.classList.add('slide1')
        players.classList.remove('slide2')
        thegame = 'O'
        element.setAttribute('id', thegame)
    } else {
        element.innerHTML = `<i class="fa-solid fa-x"></i>`
        players.classList.add('slide2')
        players.classList.remove('slide1')
        element.setAttribute('id', thegame)
    }
    winnerGet()
    play.style.pointerEvents = 'none'
    element.style.pointerEvents = 'none'
    setTimeout(() => {
        bot(trueBot)
    }, Math.floor(Math.random() * 2000));
    
}

function bot(trueBot) {
    let array = []
    if (trueBot) {
        thegame = 'O'
        for (let i = 0; i < playArea.length; i++) {
            if (playArea[i].childElementCount == 0) {
                array.push(i)
            }
        }
        let randomArea = array[Math.floor(Math.random() * array.length)]
        if (array.length > 0) {
            if (players.classList.contains('slide2')) {
                playArea[randomArea].innerHTML = `<i class="fa-solid fa-o"></i>`
                players.classList.add('slide1')
                players.classList.remove('slide2')
                playArea[randomArea].setAttribute('id', thegame)
            } else {
                playArea[randomArea].innerHTML = `<i class="fa-solid fa-x"></i>`
                players.classList.add('slide2')
                players.classList.remove('slide1')
                thegame = 'X'
                playArea[randomArea].setAttribute('id', thegame)
            }
            winnerGet()
        }
        playArea[randomArea].style.pointerEvents = 'none'
        play.style.pointerEvents = 'auto'
        thegame = 'X'
    }

}

function winnerClass (classname) {
    return document.querySelector('.area' + classname).id
}

function winnerTreeXO (c1, c2, c3, xo) {
    if (winnerClass(c1) == xo && winnerClass(c2) == xo && winnerClass(c3) == xo) {
        return true
    }
}

function drawTreeXo (c1, c2, c3, c4, c5, c6, c7, c8, c9) {
    if (
    winnerClass(c1) &&
    winnerClass(c2) &&
    winnerClass(c3) &&
    winnerClass(c4) &&
    winnerClass(c5) &&
    winnerClass(c6) &&
    winnerClass(c7) &&
    winnerClass(c8) &&
    winnerClass(c9) 
    ) {
        return true
    }
}

function winnerGet() {
    if (
    winnerTreeXO(1, 2, 3, thegame) ||
    winnerTreeXO(4, 5, 6, thegame) ||
    winnerTreeXO(7, 8, 9, thegame) ||
    winnerTreeXO(1, 4, 7, thegame) ||
    winnerTreeXO(2, 5, 8, thegame) ||
    winnerTreeXO(3, 6, 9, thegame) ||
    winnerTreeXO(1, 5, 9, thegame) ||
    winnerTreeXO(3, 5, 7, thegame)) {
        trueBot = false
        bot(trueBot)
        setTimeout(() => {
            play.classList.remove('playshow')
            result.classList.add('resultshow')
        }, 700)

        resultWon.innerHTML = `Player ${thegame} win the game!`
    } else if ( drawTreeXo(1, 2, 3, 4, 5, 6, 7, 8, 9)) {
            play.classList.remove('playshow')
            result.classList.add('resultshow')
            resultWon.textContent = 'Match has been draw'
        } 
}

resultButton.addEventListener('click', () => {
    window.location.reload()
})