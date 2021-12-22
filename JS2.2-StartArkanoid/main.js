"use strict";

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let ball = {
  color: "blue",
  radius: 20,
  x: (window.innerWidth - 400)/2,
  y: 200,
  animation_id: null,
  animationPlay: true,
  directionX: 1,
  directionY: 1,
};
let game = {
  color: "#DDDDDD",
  speed: 10,
  gameOver: false,
};
let paddle = {
  color: "black",
  x: (window.innerWidth - 400)/2-150,
  y: window.innerHeight - 120,
  width: 300,
  height: 50,
  directionX: 1,
  speed: 10
};

let field = {
  
}

// Notre context et notre Canvas sont définis dans le Scope global pour un accès par nos fonctions
let canvasDom = {
  color: "#DDDDDD",
};
let ctx;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

/** Fonction qui affiche le cercle avec ces coordonnées et la couleur défini dans le contexte
 */
function displayGame() {
  // cadre de jeu dynamique
  canvasDom.width = window.innerWidth - 400;
  canvasDom.height = window.innerHeight - 50;
  // On vide le Canvas avant de redessiner
  ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

  displayField();
  
  if (game.gameOver) {
    displayGameOver();
  }
  displayCircle();

  displayPaddle();

}

function displayField() {
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

function displayPaddle() {
  // On dit au contexte que la couleur de remplissage est noir
  ctx.fillStyle = paddle.color;
  // On dit au contexte que la couleur de trait est noir
  ctx.strokeStyle = paddle.color;
  // On dit au contexte que la taille du trait est de 1
  ctx.lineWidth = 1;

  // On trace le contour (stroke) d'un rectangle
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

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

  if (detectCollisionFloor()) {
    ball.directionY *= 0;
    ball.directionX *= 0;
    game.gameOver = true;
    displayGame();
  }

  if (
    ball.y >= canvasDom.height - ball.radius / 2 ||
    ball.y - ball.radius <= 0
  ) {
    ball.directionY *= -1;
  }

  if (conditionCollisionPaddle()) {
    ball.directionY *= -1;
  }

  displayGame();
  // Réappel de la fonction
  ball.animation_id = window.requestAnimationFrame(playGame);
}

function moveBall() {
  if (ball.animationPlay === true) {
    // Au clic sur l'écran stop la balle
    stopMoveBall();
  } else {
    // Au clic sur l'écran relance la balle
    playGame();
  }
}
function stopMoveBall() {
  window.cancelAnimationFrame(ball.animation_id);
  ball.animationPlay = false;
}

function movePaddle(e) {
  // on détecte la touche et la direction puis on change les coordonnées
  switch (e.key) {
    case "ArrowRight":
      if (paddle.x + paddle.width < canvasDom.width) paddle.x += game.speed;
      break;
    case "ArrowLeft":
      if (paddle.x > 0) paddle.x -= game.speed;
      break;
  }

}

function detectCollisionFloor() {
    if (
      ball.y + ball.radius >= canvasDom.height
    ) {
      return true;
    }
    return false;
}

function conditionCollisionPaddle() {
  if (
    ball.x + ball.radius >= paddle.x &&
    ball.x - ball.radius <= paddle.x + paddle.width
  ) {
    if (
      ball.y + ball.radius >= paddle.y &&
      ball.y - ball.radius <= paddle.y + paddle.height
    ) {
      return true;
    }
  }
  return false;
    
}

function displayGameOver() {
  ctx.fillStyle = "Red";
  ctx.font = "60px Arial";
  ctx.fillText("GAME OVER", canvasDom.width / 2 - 100, canvasDom.height / 2);
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/
function initGame() {
  // Récupération des éléments du DOM
  canvasDom = document.querySelector("#canvas");

  // Récupération du context du canvas
  ctx = canvasDom.getContext("2d");

  displayGame();

  playGame();

  // Gestion des évènements
  document.addEventListener("click", moveBall);

  //Maintenant on met un évent pour savoir si l'utilisateur apuie sur une flèche du clavier
  document.addEventListener("keydown", movePaddle);
}

/********************* MAIN  ***************************/
document.addEventListener("DOMContentLoaded", initGame);
