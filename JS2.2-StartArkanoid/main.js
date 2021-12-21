"use strict";

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let ball = {
  color: "blue",
  radius: 20,
  x: 300,
  y: 300,
  animation_id: null,
  animationPlay: true,
  directionX: 1,
  directionY: 1,
};
let game = {
  color: "#DDDDDD",
    speed: 10,
};
let square = {
    color: 'black',
    x: 550,
    y: 450,
    width: 200,
    height: 50,
    speed: 5,
    directionX: 1
}

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom = {
  color: "#DDDDDD"
};
let ctx;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

/** Fonction qui affiche le cercle avec ces coordonnées et la couleur défini dans le contexte
 */
function displayGame() {
  // On vide le Canvas avant de redessiner
  ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

  displayField();

  displayCircle();

  displaySquare();
}

function displayField() {
  // cadre de jeu dynamique
  canvasDom.width = window.innerWidth - 200;
  canvasDom.height = window.innerHeight - 50;

  // On dit au contexte que la couleur de remplissage est gris
  ctx.fillStyle = game.color;
  // On rempli le Canvas de gris en fond
  ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
}

function displayCircle() {
  // On dit au contexte que la couleur de remplissage est rouge
  ctx.fillStyle = ball.color;

  //On trace un nouveau cercle rempli/ // on commence le tracé
  ctx.beginPath();
  // on trace un arc fermé (un cercle)
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  // on dessine sur le canvas en remplissant le tracé
  ctx.fill();
  // On aurait pu dessiner sur le Canvas seulement le contour ! //
  ctx.stroke();
}

function displaySquare() {
  // On dit au contexte que la couleur de remplissage est noir
  ctx.fillStyle = square.color;
  // On dit au contexte que la couleur de trait est noir
  ctx.strokeStyle = square.color;
  // On dit au contexte que la taille du trait est de 1
  ctx.lineWidth = 1;
  // On trace le contour (stroke) d'un rectangle
  ctx.strokeRect(square.x, square.y, square.width, square.height);
  ctx.fillRect(square.x, square.y, square.width, square.height);
}

// function moveBall() {
//   ball.animationPlay = true;

//   // Changement de la position de la balle en fonction de la direction
//   ball.x += ball.directionX * 10;
//   ball_DOM.style.left = `${ball.x}px`;
//   ball.y += ball.directionY * 10;
//   ball_DOM.style.top = `${ball.y}px`;

//   // Changement de la direction de la balle
//   if (
//     ball.positionX >= windowScreen.windowWidth - ball_DOM.clientWidth ||
//     ball.positionX <= 0
//   ) {
//     // Si la balle sort de la fenêtre , ball_DOM.clientWidth = largeur de la balle
//     ball.directionX *= -1;
//   }

//   if (
//     ball.positionY >= windowScreen.windowHeight - ball_DOM.clientHeight ||
//     ball.positionY <= 0
//   ) {
//     ball.directionY *= -1;
//   }

//   // Réappel de la fonction
//   ball.animation_id = window.requestAnimationFrame(moveBall);
// }

function playGame() {
  ball.animationPlay = true;

  // Changement de la position de la balle en fonction de la direction
  ball.y += ball.directionY * game.speed;
  // ball.x += ball.directionX * 10;

  // Rebond sur les bords

  // if (ball.x >= canvasDom.width - ball.radius ||
  //     ball.x <= 0
  //   ) {
  //     ball.directionX *= -1;
  //   }

  if (ball.y >= canvasDom.height - (ball.radius/2) || ball.y - ball.radius <= 0) {
    ball.directionY *= -1;
  }

  displayGame();
  // Réappel de la fonction
  ball.animation_id = window.requestAnimationFrame(playGame);
}

function stopMoveBall() {
  window.cancelAnimationFrame(ball.animation_id);
  ball.animationPlay = false;
}

function moveSquare(e) {

    // on détecte la touche et la direction puis on change les coordonnées
	 switch(e.key)
	 {
		 case 'ArrowRight':
			 if (square.x + square.width < canvasDom.width ) square.x += game.speed;
			 break;
		 case 'ArrowLeft':
			 if (square.x > 0) square.x -= game.speed;
			 break;
	 }
 
	 // On dessine notre carré 
	 displaySquare();
}
/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
function main() {
  // Récupération des éléments du DOM
  canvasDom = document.querySelector("#canvas");

  // Récupération du context du canvas
  ctx = canvasDom.getContext("2d");

  // Animation
  ball.animation_id = window.requestAnimationFrame(playGame);

  // Gestion des évènements
  document.addEventListener("click", () => {
    if (ball.animationPlay === true) {
      // Au clic sur l'écran stop la balle
      stopMoveBall();
    } else {
      // Au clic sur l'écran relance la balle
      playGame();
    }
  });

  //Maintenant on met un évent pour savoir si l'utilisateur apuie sur une flèche du clavier 
  document.addEventListener('keydown', moveSquare);
}

/********************* MAIN  ***************************/
document.addEventListener("DOMContentLoaded", main);
