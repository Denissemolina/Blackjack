/* eslint-disable no-undef */
/**
 * 2C = Two of Clubs (Trebol)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espada)
 */

let deck = [];
const types = ["C", "D", "H", "S"];
const specialCards = ["A", "J", "Q", "K"];

let playerPoints = 0;
let computerPoints = 0;

const orderBtn = document.querySelector("#btn_order");
const stopBtn = document.querySelector("#btn_stop");

const divPlayerCards = document.querySelector("#player-cards");
const divComputerCards = document.querySelector("#computer-cards");

const impressPoints = document.querySelectorAll("small");

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  deck = _.shuffle(deck);
  //console.log(deck);
  return deck;
};
createDeck();

const orderCards = () => {
  if (deck.length === 0) {
    // eslint-disable-next-line no-throw-literal
    throw "No cards in the deck";
  }
  const card = deck.pop(deck);
  //console.log("card", card);
  return card;
};
//orderCards();

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};
//const value = cardValue(orderCards());

//!The computer's turn
const computersTurn = (minimumPoints) => {
  do {
    const card = orderCards();
    computerPoints = computerPoints + cardValue(card);
    console.log(computerPoints);
    impressPoints[1].innerText = computerPoints;

    const cardImg = document.createElement("img");
    cardImg.src = `assets/cards/${card}.png`;
    cardImg.classList.add("cards");
    divComputerCards.append(cardImg);

    if (minimumPoints > 21) {
      break;
    }
  } while (computerPoints < minimumPoints && minimumPoints <= 21);
};

//Events
orderBtn.addEventListener("click", () => {
  const card = orderCards();
  playerPoints = playerPoints + cardValue(card);
  console.log(playerPoints);

  impressPoints[0].innerText = playerPoints;

  const cardImg = document.createElement("img");
  cardImg.src = `assets/cards/${card}.png`;
  cardImg.classList.add("cards");
  divPlayerCards.append(cardImg);

  if (playerPoints > 21) {
    console.warn("U loose");
    orderBtn.disabled = true;
    stopBtn.disabled = true;

    computersTurn(playerPoints);
  } else if (playerPoints === 21) {
    console.warn("U win");
    orderBtn.disabled = true;
    stopBtn.disabled = true;
  }
});

stopBtn.addEventListener("click", () => {
  orderBtn.disabled = true;
  stopBtn.disabled = true;

  computersTurn(playerPoints);
});
