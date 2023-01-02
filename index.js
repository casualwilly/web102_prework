/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import games from "./games.js";
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);
let buttonlist = GAMES_JSON;

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data

  for (let i = 0; i < games.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("game-card");

    const displayCard = `
        <img src="${games[i].img}" alt="Card Image" class="game-img">
        <p>This is ${games[i].name}</p>
        <p>${games[i].description}</p>

    `;

    newDiv.innerHTML = displayCard;

    gamesContainer.append(newDiv);
  }

  // create a new div element, which will become the game card

  // add the class game-card to the list

  // set the inner HTML using a template literal to display some info
  // about each game
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")

  // append the game to the games-container
}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

const displayContributions = `
    <p>${totalContributions.toLocaleString("en-US")}</p>`;

contributionsCard.innerHTML = displayContributions;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);
// set inner HTML using template literal

const raisedDisplay = `
    <p>${totalRaised.toLocaleString("en-US")}</p>
    `;

raisedCard.innerHTML = raisedDisplay;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const countGames = GAMES_JSON.length;

const totalGamesDisplay = `
    <p>${countGames.toLocaleString("en-US")}
    `;

gamesCard.innerHTML = totalGamesDisplay;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal

  let unFunded = GAMES_JSON.filter((song) => {
    return song.pledged < song.goal;
  });

  // use the function we previously created to add the unfunded games to the DOM

  addGamesToPage(unFunded);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal

  let funded = GAMES_JSON.filter((song) => {
    return song.pledged >= song.goal;
  });

  // use the function we previously created to add unfunded games to the DOM

  addGamesToPage(funded);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
// add event listeners with the correct functions to each button
const unfundedBtn = document
  .getElementById("unfunded-btn")
  .addEventListener("click", filterUnfundedOnly);
const fundedBtn = document
  .getElementById("funded-btn")
  .addEventListener("click", filterFundedOnly);
const allBtn = document
  .getElementById("all-btn")
  .addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unFunded = GAMES_JSON.filter((song) => {
  return song.pledged < song.goal;
});

const unFundedNum = unFunded.length;

// create a string that explains the number of unfunded games using the ternary operator

let displayString = `A total of $${totalContributions.toLocaleString(
  "en-US"
)} has been raised for ${countGames} ${
  countGames == 1 ? `game` : `games`
}. Currently,
${unFundedNum} ${
  unFundedNum == 1 ? `game remains` : `games remain`
} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let p = document.createElement("p");
const displayInfo = `${displayString}`;
p.textContent = displayInfo;
descriptionContainer.append(p);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let [firstGame, secondGame, ...others] = sortedGames;

console.log(firstGame.name + "AND" + secondGame.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element

p = document.createElement("p");
const displayFirstGame = `${firstGame.name}`;
p.textContent = displayFirstGame;
firstGameContainer.append(p);

// do the same for the runner up item

p = document.createElement("p");
const displaySecondGame = `${secondGame.name}`;
p.textContent = displaySecondGame;
secondGameContainer.append(p);

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[datasearch]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible = user.name.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

users = GAMES_JSON.map((game) => {
  const card = userCardTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]");
  const body = card.querySelector("[data-body]");
  header.textContent = game.name;
  body.textContent = game.description;
  userCardContainer.append(card);
  return { name: game.name, description: game.description, element: card };
});
