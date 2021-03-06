// -------------------------------------------------------------------- Global variables

const introPage = document.getElementById("js-intro-page");
const agreePage = document.getElementById("js-agree-page");
const cardPage = document.getElementById("js-card-page");

// -------------------------------------------------------------------- Navigation function

function navigation(id) {
    var pages = document.getElementsByClassName("pages");
    for (var i = 0; i < pages.length; i++) { // Adds hide to all pages
        pages[i].classList.add("hide");
    }
    switch (id) { // Removes hide from the page to be displayed
        case "home":
        case "a-home":
        case "g-home":
            introPage.classList.remove("hide");
            break;
        case "agree":
            agreePage.classList.remove("hide");
            break;
        case "card":
            cardPage.classList.remove("hide");
            break;
        default:
            homePage.classList.remove("hide");
            break;
    }
}

// -------------------------------------------------------------------- Copyright

function copyrightYear() {
    var d = new Date();
    var y = d.getFullYear();
    document.getElementById("copyright").innerHTML = y;
}

copyrightYear();

// --------------------------------------------------------------------- Flip cards

class LuckyIrishman {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById("time-remaining");
    }

    startGame() { // Starts the timer, hides cards, populates a random card
        this.timeRemaining = this.totalTime;
        this.busy = true;
        setTimeout(() => {
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.cardPopulate();
    }

    hideCards() { // All cards are flipped so the back is facing forwards
        this.cardsArray.forEach(card => {
            card.classList.remove("visible");
        });
    }

    flipCard(card) { // Makes specific card visible with animation
        if (this.canFlipCard(card)) {
            card.classList.add("visible");
            card.classList.remove("card-front");
        }
    }

    startCountdown() { // Starts the timer function
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() { // Clears timer, shows game over overlay, hides all cards
        clearInterval(this.countdown);
        document.getElementById("game-over-text").classList.add("visible");
        this.hideCards();
    }

    canFlipCard() { // Allows card to flip when it's not already flipping
        return !this.busy;
    }

    cardPopulate() { // Randomises the order of the cards that are displayed
        if (card.classList.contains("visible")) {
            this.hideCards();
            card.classList.add("card-front");
        }
        let randomNumber = Math.ceil(Math.random() * 21); // Gets a random number between 1 and 21
        let cardBox = document.getElementById("card-box");
        cardBox.src = `assets/images/cards/card${randomNumber}.jpg`; // Imports the image file
        cardBox.alt = "An image related to the drinking game"; // Adds an alt tag
    }
}

// -------------------------------------------------------------------- Audio functions

let music = "off"; // Set music to off to begind with, so no music auto-plays

const irishAudio = new Audio('assets/audio/audio.mp3'); // Import audio file

irishAudio.loop = true; // Loop the audio for however long they play

function playMusic() { // Decide whether to play music
    if (music === "on") {
        irishAudio.play();
    } else {
        irishAudio.pause();
    }
}

function checkAudioButtons() { // Change the text of the audio button once clicked
    if (music === "on") {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-mute"></i><br>Audio off`;
    } else {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-up"></i><br>Audio on`;
    }
}

function toggleMusic() { // So that the user can toggle the music off or on
    if (music === "off") {
        music = "on";
    } else {
        music = "off";
    }
    checkAudioButtons();
    playMusic();
}

// function changeCards() {
//     let cards = Array.from(document.getElementsByClassName("card-flip"));
//     this.busy = true;
//     setTimeout(() => {
//         game.hideCards();
//         game.cardPopulate(card);
//         game.flipCard(card);
//     }, 2000);
//     this.busy = false;
// }


// -------------------------------------------------------------------------------------------------readyState function

if (document.readyState == "loading") { // When doc is loading, wait till it's ready
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

function ready() { // When doc is ready, get elements
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card-flip"));
    let game = new LuckyIrishman(120, cards);

    overlays.forEach(overlay => { // When overlay is clicked, remove visibility and start game
        overlay.addEventListener("click", () => {
            overlay.classList.remove("visible");
            game.startGame();
        });
    });

    cards.forEach(card => { // Use click event listener on card to flip it
        card.addEventListener("click", () => {
            game.hideCards();
            setTimeout(function() {
                game.flipCard(card);
                game.cardPopulate(card);
            }, 500);
        });
    });
}