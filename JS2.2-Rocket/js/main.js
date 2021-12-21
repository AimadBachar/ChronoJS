

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let timer = 0;
let sec = 10; // secondes
let btnStart;
let btnStop;
let btnReset;
let timerDom;
let stars = ["tiny", "normal", "big"];

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function updateTimer() {
    let go = "go";
    // on met à jour la zone HTML
    timerDom.innerText = "10";
    timer = setTimeout(updateTimer, 1000);
    timerDom.innerText = --sec;
    if (sec === 0) {
        clearTimeout(timer);
        timerDom.innerText = "0";
        changeImage(go);
        btnStop.classList.add('disabled');
    }
}

function changeImage(key) {
    let img = document.querySelector('#rocket');
    console.log(img);
    switch (key) {
        case 'start':
            img.src = 'images/rocket2.gif';
            break;
        case 'go':
            img.src = 'images/rocket3.gif';
            img.classList.add('tookOff');
            break;
        case 'stop':
            img.src = 'images/rocket1.png';
            img.classList.remove('tookOff');
            break;
    }
}


function createStars() {
    let main = document.querySelector('main');
    for (let index = 0; index < 150; index++) {
        let star = document.createElement('div');
        star.classList.add('star');
        const randomElement = stars[Math.floor(Math.random() * stars.length)];
        star.classList.add(`${randomElement}`);	

        // random position
        let randomPosition = Math.floor(Math.random() * window.innerWidth);
        star.style.left = `${randomPosition}px`;
        star.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;

        
        main.appendChild(star);
        
    }
}


function launchRocket() {
    let timer = updateTimer();
    let start = "start";
    btnStart.classList.add('disabled');
    changeImage(start);
    this.removeEventListener('click', arguments.callee);
    btnStop.classList.remove('disabled');
}


function stopRocket() {
    clearTimeout(timer);
    let stop = "stop";
    changeImage(stop);
    this.removeEventListener('click', arguments.callee);
}

function resetRocket() {
    //reload page
    setTimeout(function () {
        location.reload();
    }, 1000);
}


/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
function main() {
    // Récupération des éléments du DOM
    btnStart = document.querySelector("#firing-button");
    btnStop = document.querySelector("#stop-button");
    btnReset = document.querySelector("#reset-button");

    btnStop.classList.add('disabled');
    createStars();

    // // Zone du DOM qui contient le compteur
    timerDom = document.querySelector('span');
    timerDom.innerText = "10";
    
    // Evènement qui détecte quand on clique sur le bouton "start"
    btnStart.addEventListener('click', launchRocket);
    
    // Evènement qui détecte quand on clique sur le bouton "stop"
    btnStop.addEventListener('click', stopRocket);
        
    // Evènement qui détecte quand on clique sur le bouton "reset"
    btnReset.addEventListener('click', resetRocket);
};


/********************* MAIN  ***************************/
document.addEventListener('DOMContentLoaded', main);