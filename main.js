'use strict'

/******************** DATA ******************** */
// Initialisation du compteur
let timer = 0;
let sec = 0; // secondes
let min = 0; // minutes
let hrs = 0; // heures
let timerOn = false;
/******************** FONCTIONS ******************** */

function main() {

    // Récupération des éléments du DOM
    let btnStart = document.querySelector("#startStop");
    let btnReset = document.querySelector("#reset");

    // Zone du DOM qui contient le compteur
    let timerDom = document.querySelector('#chrono');

    // Evènement qui détecte quand on clique sur le bouton "start"
    btnStart.addEventListener('click', function () {
        console.log(timerOn);
        if (timerOn === false) {
            timerOn = true;
            timer = updateTimer(timerDom);
            // Execution d'une fonction de mise à jour du compteur toutes les secondes. Cette fonction reçoit en paramètre la zone du DOM à mettre à jour
        } else {
            timerOn = false;
            clearTimeout(timer);
        }

    });


    // Evènement qui détecte quand on clique sur le bouton "reset"
    btnReset.addEventListener('click', function () {    
        clearTimeout(timer);
        timerDom.innerHTML = "00:00:00";
        sec = 0;
        min = 0;
        hrs = 0;
        timerOn = false;
    });

    /** Fonction qui met à jour le timer en ajoutant 1
    * @param {HTMLElement} objet du DOM où est contenu le texte du Timer
    */
    function updateTimer(timerDom) {
        // on met à jour la zone HTML
        if (sec > 59) {
            sec = 0;
            min++;
            if (min >= 60) {
                min = 0;
                hrs++;
            }
        }
            
        timerDom.innerHTML = (hrs > 9 ? hrs : "0" + hrs) 
        + ":" + (min > 9 ? min : "0" + min)
           + ":" + (++sec > 9 ? sec : "0" + sec);
        timer = window.setTimeout(updateTimer, 1000, timerDom)
    }

};



/********************* MAIN  ***************************/
document.addEventListener('DOMContentLoaded', main);





