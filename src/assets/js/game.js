(() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"];
  let playersPoints = [];

  // HTML References
  const orderBtn = document.querySelector("#btn_order"),
    stopBtn = document.querySelector("#btn_stop"),
    newGameBtn = document.querySelector("#btn_newgame"),
    theWinner = document.querySelector("#theWinner");
  const divPlayerCards = document.querySelectorAll(".divCards"),
    impressPointsHTML = document.querySelectorAll("small");

  // This function initializes the game
  const startingGame = (playersNum = 2) => {
    while (theWinner.firstChild) {
      theWinner.removeChild(theWinner.firstChild);
    }

    deck = createDeck();
    playersPoints = [];
    for (let i = 0; i < playersNum; i++) {
      playersPoints.push(0);
    }
    impressPointsHTML.forEach((elem) => (elem.innerText = 0));
    divPlayerCards.forEach((elem) => (elem.innerHTML = ""));

    orderBtn.disabled = false;
    stopBtn.disabled = false;
  };

  // Creating a deck
  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }
    return _.shuffle(deck);
  };

  // This function allows you to order a card
  const orderCard = () => {
    if (deck.length === 0) {
      throw "No cards in the deck";
    }
    return deck.pop();
  };

  // This function is used to obtain the value of the card
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  // Collecting points -- turn: 0 = first player and the lastest is the computer
  const collectPoints = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + cardValue(card);
    impressPointsHTML[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  const createCard = (card, turn) => {
    const cardImg = document.createElement("img");
    cardImg.src = `assets/cards/${card}.png`;
    cardImg.classList.add("cards");
    divPlayerCards[turn].append(cardImg);
  };

  const determineTheWinner = () => {
    const [minimumPoints, computerPoints] = playersPoints;
    setTimeout(() => {
      if (computerPoints === minimumPoints) {
        const winner = document.createElement("div");
        winner.textContent = "Nobody won, play again! ♠️🃏";
        theWinner.append(winner);
      } else if (minimumPoints > 21) {
        const winner = document.createElement("div");
        winner.textContent = "Computer won 💻🏆";
        theWinner.append(winner);
      } else if (computerPoints > 21) {
        const winner = document.createElement("div");
        winner.textContent = "Player wins 🥳🎉!";
        theWinner.append(winner);
      } else {
        const winner = document.createElement("div");
        winner.textContent = "Computer won 💻🎉";
        theWinner.append(winner);
      }
    }, 100);
  };

  // The computer's turn
  const computersTurn = (minimumPoints) => {
    let computerPoints = 0;
    do {
      const card = orderCard();
      computerPoints = collectPoints(card, playersPoints.length - 1);
      createCard(card, playersPoints.length - 1);
    } while (computerPoints < minimumPoints && minimumPoints <= 21);
    determineTheWinner();
  };

  // The player's turn
  orderBtn.addEventListener("click", () => {
    const card = orderCard();
    const playerPoints = collectPoints(card, 0);

    createCard(card, 0);

    if (playerPoints > 21) {
      orderBtn.disabled = true;
      stopBtn.disabled = true;
      computersTurn(playerPoints);
    } else if (playerPoints === 21) {
      orderBtn.disabled = true;
      stopBtn.disabled = true;
      computersTurn(playerPoints);
    }
  });

  stopBtn.addEventListener("click", () => {
    orderBtn.disabled = true;
    stopBtn.disabled = true;

    computersTurn(playersPoints[0]);
  });

  // Creating a deck
  newGameBtn.addEventListener("click", () => {
    startingGame();
  });
})();
