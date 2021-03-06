// -------------------------------------------------------------------- Global variables

const introPage = document.getElementById("js-intro-page");
const agreePage = document.getElementById("js-agree-page");
const cardPage = document.getElementById("js-card-page");

// -------------------------------------------------------------------- Navigation functions

function navigation(id) {
    var pages = document.getElementsByClassName("pages");
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.add("hide");
    }
    switch (id) {
        case "home":
        case "a-home":
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

// --------------------------------------------------------------------- flip cards

class LuckyIrishman {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById("time-remaining");
    }

    startGame() {
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

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove("visible");
        });
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            card.classList.add("visible");
        }
    }

    getCardType(card) {
        return card.getElementsByClassName("card-value")[0].src;
    }

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
            this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        document.getElementById("game-over-text").classList.add("visible");
        this.hideCards();
    }

    canFlipCard() {
        return !this.busy;
    }

    cardPopulate() {
        let randomNumber = Math.ceil(Math.random() * 21); // Gets a random number between 1 and 21
        let cardBox = document.getElementById("card-box");
        cardBox.src = `assets/images/cards/card${randomNumber}.jpg`;
        cardBox.alt = "An image related to the drinking game";
    }

    nextFlip() {
        this.flipCard && this.cardPopulate;
    }

}




let music = "off";
const irishAudio = new Audio('assets/audio/audio.mp3');
irishAudio.loop = true;
function playMusic() { // Decide whether to play music
    if (music === "on") {
        irishAudio.play();
    } else {
        irishAudio.pause();
    }
}
function checkAudioButtons() {
    if (music === "on") {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-mute"></i><br>Audio off`; // Changes the text of the button once clicked
    } else {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-up"></i><br>Audio on`; // Changes the text of the button once clicked
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


// -------------------------------------------------------------------------------------------------readyState function

if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

function ready(){
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card-flip"));
    let game = new LuckyIrishman(120, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove("visible");
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.flipCard(card);
        });
    });
}