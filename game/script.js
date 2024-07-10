let start = document.querySelector('.btn');
let game = document.querySelector('.game');
let time = document.querySelector('#time');
let timeH1 = document.querySelector('#time-header');
let resultH1 = document.querySelector('#result-header');
let inputTime = document.querySelector('#game-time');
let result = document.querySelector('#result');
let score = 0;
let isGameActive = false;

function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min) + min))

}


function startGame() {
    inputTime.setAttribute('disabled', 'true');
    let score = 0;
    timeH1.style.display = 'block';
    resultH1.classList.add('hide');
    let isGameActive = true;
    start.classList.add('hide');
    game.style.backgroundColor = 'white';
    let interval = setInterval(function() {
        let currentTime = Number(time.innerText)
        if (currentTime <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            time.innerText = (currentTime - 0.1).toFixed(1)
        }
    }, 100)
    renderBox()
}

function renderBox() {
    const randomSize = getRandom(30, 100);
    let maxDelta = 300 - randomSize;
    const randomTop = getRandom(30, maxDelta);
    game.innerHTML = '';
    let square = document.createElement('div');
    square.classList.add('box')
    square.style.width = `${randomSize}px`;
    square.style.height = `${randomSize}px`;
    square.style.position = 'absolute';
    square.style.backgroundColor = 'black';
    square.style.top = `${randomTop}px`;
    square.style.left = `${randomTop}px`;
    square.style.cursor = 'pointer';
    game.appendChild(square);
}


function gameBoxClick(event) {
    if (event.target.classList.contains('box')) {
        score++
        renderBox()
    }
    if (!isGameActive) {
        return;
    }

}


function endGame() {
    isGameActive = false;
    game.innerHTML = '';
    inputTime.removeAttribute('disabled');
    start.classList.remove('hide');
    game.style.backgroundColor = '#ccc';
    timeH1.style.display = 'none';
    resultH1.classList.remove('hide');
    result.innerText = score;
}

inputTime.addEventListener('change', () => {
    time.innerText = Number(inputTime.value).toFixed(1);
    resultH1.classList.add('hide');
    timeH1.style.display = 'block';
})
start.addEventListener('click', startGame);

game.addEventListener('click', gameBoxClick);