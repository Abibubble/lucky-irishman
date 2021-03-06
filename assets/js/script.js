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
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
         }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        });
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
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

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        return !this.busy  && card !== this.cardToCheck;
    }
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