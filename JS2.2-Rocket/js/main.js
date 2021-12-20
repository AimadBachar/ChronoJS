

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let timer = 0;
let sec = 10; // secondes
let timerOn = false;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function updateTimer() {
    let go = "go";
    let timerDom = document.querySelector('span');
    // on met à jour la zone HTML
    
    timer = setTimeout(updateTimer, 1000);
    timerDom.innerText = --sec;
    timerOn = false;
    if (sec === 0) {
        clearTimeout(timer);
        timerDom.innerText = "0";
        changeImage(go);
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
    
        default:
            break;
    }
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
function main() {
    // Récupération des éléments du DOM
    let btnStart = document.querySelector("#firing-button");

    // Zone du DOM qui contient le compteur
    let timerDom = document.querySelector('span');
    timerDom.innerText = "10";
    
    // Evènement qui détecte quand on clique sur le bouton "start"
    btnStart.addEventListener('click', function () {
        let timer = updateTimer();
        let start = "start";
        btnStart.classList.add('disabled');
        changeImage(start);
        this.removeEventListener('click', arguments.callee);
    });



};


/********************* MAIN  ***************************/
document.addEventListener('DOMContentLoaded', main);