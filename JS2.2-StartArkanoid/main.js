'use strict'

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let ball_DOM;
let ball = {
    positionX: 0,
    positionY: 0,
}
let directionX = 10;
let directionY = 10;
let windowWidth;
let windowHeight;



/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function moveBall() {
    // Récupération de la taille de la fenêtre
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    // Changement de la position de la balle en fonction de la direction
    ball.positionX += directionX;
    ball_DOM.style.left = `${ball.positionX}px`;
    ball.positionY += directionY;
    ball_DOM.style.top = `${ball.positionY}px`;

    // Changement de la direction de la balle
    if (ball.positionX >= windowWidth - ball_DOM.clientWidth || ball.positionX <= 0) {   // Si la balle sort de la fenêtre , ball_DOM.clientWidth = largeur de la balle
        directionX *= -1;
    }

    if (ball.positionY >= windowHeight - ball_DOM.clientHeight || ball.positionY <= 0) {
        directionY *= -1;
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