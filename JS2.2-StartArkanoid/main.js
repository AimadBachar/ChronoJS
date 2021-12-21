'use strict'

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let ball_DOM;
let ball = {
    with: 40,
    height: 40,
    positionX: 0,
}
let directionX = 10;
let directionY = 10;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;



/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function moveBall() {
    // Changement de la position de la balle
    ball.positionX += direction;
    ball_DOM.style.left = `${ball.positionX}px`;

    // Changement de la direction de la balle
    if (ball.positionX >= windowWidth - ball.with || ball.positionX <= 0) {
        direction *= -1;
    }

    // Réappel de la fonction
    window.requestAnimationFrame(moveBall);
}



/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
function main() {
    // Récupération des éléments du DOM
    ball_DOM = document.querySelector("#ball");


    // Animation
    window.requestAnimationFrame(moveBall);
    
}





/********************* MAIN  ***************************/
document.addEventListener('DOMContentLoaded', main);