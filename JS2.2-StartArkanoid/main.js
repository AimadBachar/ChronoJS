"use strict";

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let ball_DOM;
let ball = {
  positionX: 0,
  positionY: 0,
  directionX: 1,
  directionY: 1,
  animation_id: 0,
  animationPlay : true
};
let windowScreen = {
  windowWidth: 0,
  windowHeight: 0,
};

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function moveBall() {
  ball.animationPlay = true;
  // Récupération de la taille de la fenêtre
  windowScreen.windowWidth = window.innerWidth;
  windowScreen.windowHeight = window.innerHeight;
  // Changement de la position de la balle en fonction de la direction
  ball.positionX += ball.directionX * 10;
  ball_DOM.style.left = `${ball.positionX}px`;
  ball.positionY += ball.directionY * 10;
  ball_DOM.style.top = `${ball.positionY}px`;

  // Changement de la direction de la balle
  if (
    ball.positionX >= windowScreen.windowWidth - ball_DOM.clientWidth ||
    ball.positionX <= 0
  ) {
    // Si la balle sort de la fenêtre , ball_DOM.clientWidth = largeur de la balle
    ball.directionX *= -1;
  }

  if (
    ball.positionY >= windowScreen.windowHeight - ball_DOM.clientHeight ||
    ball.positionY <= 0
  ) {
    ball.directionY *= -1;
  }

  // Réappel de la fonction
  ball.animation_id = window.requestAnimationFrame(moveBall);
}

function stopMoveBall() {
  window.cancelAnimationFrame(ball.animation_id);
  ball.animationPlay = false;
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
function main() {
  // Récupération des éléments du DOM
  ball_DOM = document.querySelector("#ball");

  // Animation
  ball.animation_id = window.requestAnimationFrame(moveBall);

  // Gestion des évènements
  document.addEventListener("click", () => {
    if (ball.animationPlay === true) {
      // Au clic sur l'écran stop la balle
      stopMoveBall();
    } else {
      // Au clic sur l'écran relance la balle
      moveBall();
    }
  });
}

/********************* MAIN  ***************************/
document.addEventListener("DOMContentLoaded", main);
