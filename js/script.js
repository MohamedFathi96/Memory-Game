const gameLevels = document.querySelector(".game-levels");
const cards = document.getElementsByClassName("card");
const score = document.getElementById("score");
let matches = 0,
  expectedScore = 0;

// sounds Effects

const cardClickedSound = document.createElement("audio");
cardClickedSound.src = "./sounds/cardClick.mp3";
cardClickedSound.volume = 0.3;

const matchFoundSound = document.createElement("audio");
matchFoundSound.src = "./sounds/matchFound.mp3";

const successSound = document.createElement("audio");
successSound.src = "./sounds/success.mp3";

const boardImages = [
  {
    img: 1,
    src: "./images/1.png",
  },
  {
    img: 2,
    src: "./images/2.png",
  },
  {
    img: 3,
    src: "./images/3.png",
  },
  {
    img: 4,
    src: "./images/4.png",
  },
  {
    img: 5,
    src: "./images/5.png",
  },
  {
    img: 6,
    src: "./images/6.png",
  },
  {
    img: 7,
    src: "./images/7.png",
  },
  {
    img: 8,
    src: "./images/8.png",
  },
  {
    img: 9,
    src: "./images/9.png",
  },
  {
    img: 10,
    src: "./images/10.png",
  },
  {
    img: 11,
    src: "./images/11.png",
  },
  {
    img: 12,
    src: "./images/12.png",
  },
];

arrayShuffle(boardImages);

function startGame(event) {
  gameLevels.style.display = "none";
  expectedScore = event.target.dataset.size / 2;
  createGameBoard(expectedScore * 2);
}

function createGameBoard(size) {
  let sizedBoaredImages = boardImages.slice(0, size / 2);
  sizedBoaredImages = [...sizedBoaredImages, ...sizedBoaredImages];
  arrayShuffle(sizedBoaredImages);
  for (let i = 0; i < sizedBoaredImages.length; i++) {
    cards[i].classList.remove("hidden");

    let shape = document.createElement("img");
    shape.src = sizedBoaredImages[i].src;
    cards[i].appendChild(shape);
    // shape.classList.toggle("hidden");
    let whiteImage = document.createElement("img");
    whiteImage.src = "./images/white.png";
    whiteImage.setAttribute("data-id", sizedBoaredImages[i].img);
    cards[i].appendChild(whiteImage);

    whiteImage.addEventListener("click", (event) => {
      cardClicked(event);
    });
  }
}

let clickedCards = [];
let clickedCardsIDs = [];

function cardClicked(event) {
  if (clickedCards.length === 3) return;

  cardClickedSound.play();

  clickedCards.push(event.target);
  clickedCardsIDs.push(event.target.getAttribute("data-id"));

  event.target.classList.add("hidden");

  if (clickedCards.length === 2) {
    // Two Cards Clicked
    if (clickedCardsIDs[0] === clickedCardsIDs[1]) {
      // if Cards Match
      score.innerHTML = ++matches;
      matchFoundSound.play();
      if (matches === expectedScore) {
        // Game Finish
        successSound.play();
        document
          .getElementsByClassName("overlay")[0]
          .classList.remove("hidden");
      }
      clickedCards = [];
      clickedCardsIDs = [];
    } else {
      // Two cards no match
      setTimeout(() => {
        clickedCards.forEach((elem) => {
          elem.classList.remove("hidden");
          clickedCards = [];
          clickedCardsIDs = [];
        });
      }, 600);
    }
  }
}

function arrayShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = arr[i];
    arr[i] = arr[j];
    arr[j] = k;
  }
}
