(() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"],
    specialCards = ["A", "J", "Q", "K"];

  let playersPoints = [];

  const orderBtn = document.querySelector("#btn_order"),
    stopBtn = document.querySelector("#btn_stop"),
    newGameBtn = document.querySelector("#btn_newgame");

  const divPlayerCards = document.querySelector("#player-cards"),
    divComputerCards = document.querySelector("#computer-cards"),
    impressPoints = document.querySelectorAll("small");

  //? This function initializes the game
  const startingGame = (playersNum = 2) => {
    deck = createDeck();
    for (let i = 0; i > playersNum; i++) {
      playersPoints.push(0);
    }
  };

  //? Creating a deck
  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }
    return _.shuffle(deck);
  };

  //? This function allows you to order a card
  const orderCards = () => {
    if (deck.length === 0) {
      // eslint-disable-next-line no-throw-literal
      throw "No cards in the deck";
    }
    return deck.pop();
  };

  //? This function is used to obtain the value of the card
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  //? Collecting points -- turn: 0 = first player and the lastest is the computer
  const collectPoints = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + cardValue(card);
    impressPoints[turn].innerText = playersPoints[turn];
  };

  //! The computer's turn
  const computersTurn = (minimumPoints) => {
    do {
      const card = orderCards();
collectPoints()

      const cardImg = document.createElement("img");
      cardImg.src = `assets/cards/${card}.png`;
      cardImg.classList.add("cards");
      divComputerCards.append(cardImg);

      if (minimumPoints > 21) {
        break;
      }
    } while (computerPoints < minimumPoints && minimumPoints <= 21);

    setTimeout(() => {
      if (computerPoints === minimumPoints) {
        alert("Nobodys win");
      } else if (minimumPoints > 21) {
        alert("Computers win");
      } else if (computerPoints > 21) {
        alert("Computers lost");
      } else {
        alert("Computers win");
      }
    }, 10);
  };

  //*The player's turn
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
      orderBtn.disabled = true;
      stopBtn.disabled = true;

      computersTurn(playerPoints);
    } else if (playerPoints === 21) {
      orderBtn.disabled = true;
      stopBtn.disabled = true;
    }
  });

  stopBtn.addEventListener("click", () => {
    orderBtn.disabled = true;
    stopBtn.disabled = true;

    computersTurn(playerPoints);
  });

  //? Creating a deck
  newGameBtn.addEventListener("click", () => {
    deck = createDeck();
    playerPoints = 0;
    computerPoints = 0;
    impressPoints[0].innerText = 0;
    impressPoints[1].innerText = 0;

    divComputerCards.innerHTML = "";
    divPlayerCards.innerHTML = "";

    orderBtn.disabled = false;
    stopBtn.disabled = false;
  });
})();
