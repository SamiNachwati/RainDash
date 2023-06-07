// Developer: Sami Nachwati
// File: game_mechanics.js
// Description: the game mechanics of the game's functionality

// Defining the SVG elements and other variables that will be used
const svg = document.querySelector("#my-svg");
const sky = document.querySelector("#sky");
const xElements = document.querySelectorAll(".person");
const raindropsSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
raindropsSVG.setAttribute("class", "raindrops-svg");
svg.appendChild(raindropsSVG);
var starter;
const rArray = [];
let xCircleRight;
let x1BobRight;
let x2BobRight;
let xCircleLeft;
let x1BobLeft;
let x2BobLeft;
let xBobLeft;
let xBobRight;
let rainGenerater;
let rainMovement;
let maxWidth;
let score = 0;
const rainArray = [];
const wheel = document.querySelector("#wheel");
const inner_wheel = document.querySelector("#inner-wheel");
const body1 = document.querySelector("#body1");
const first_txt = document.querySelector("#first-txt");
const second_txt = document.querySelector("#second-txt");
const screen = document.getElementById("screen");
const robot = document.querySelector("#robot");
let robotX = 0;
let bdX = parseInt(body1.getAttribute("x1"));
let bdY = parseInt(body1.getAttribute("y1"));
const scores = [];
var currentScore = document.querySelector("#current-score-value");
var maxScore = document.querySelector("#high-score-value");
var isMoving = true;
let keyboardEnabled = true; 
let playAgain = document.querySelector("#play-again");
let playAgainButton = playAgain.querySelector("button");
let lightningObject = document.querySelector("#lightning");
var lightningOn = true;
let audioOn = true;
let audio = document.querySelectorAll("audio");

function stopGame(){
  audioOn = false;
  lightningOn = false;
  startLightning();
  if(!audioOn){
    for(let u = 0; u < audio.length; u++){
      audio[u].pause();
    }
  }
  clearInterval(rainGenerater);
  clearInterval(rainMovement);
  clearInterval(starter);
  isMoving = false;
  keyboardEnabled = false;
  movePlayer(); // Remove the event listener
}



function movePlayer() {
  if(isMoving && keyboardEnabled){
    document.addEventListener("keydown", handleKeyDown);
  }
  else {
    document.removeEventListener("keydown", handleKeyDown);
  }
}



function lightning(){
  let randomVal = Math.random() * 500;
  lightningObject.style.transform = "translateX(" + randomVal + "px)";;
}


// get the thunder sound, lighting SVG, and the lighting sound
const thunderSound = document.getElementById("thunder");
const strike = document.getElementById("strike");


// function that plays the sound of thunder
function playThunder(){
  thunderSound.play();
}

// function that plays the sound of lighting
function playStrike(){
  strike.play();
}



// function that starts the lightning
function startLightning() {
  if(lightningOn){
    // Generate a random time between 5 and 15 seconds for the next lightning strike
    const time = Math.floor(Math.random() * 10000) + 5000;
    // set timouts for the thunder/lightning sounds
    lightningStarter = setTimeout(function() {
      // Play the thunder sound
      setTimeout(playThunder, parseInt(time-2000));
      // Then play the lightning strike thereafter  
      setTimeout(playStrike, parseInt(time-1000));
      // Show the lightning SVG
      setTimeout(()=>{
        lightning();
        lightningObject.style.display = "block";
      }, time-500);  
      // then hide the lighting svg object
      setTimeout(function() {
        lightningObject.style.display = "none";
      }, 500);
      
      // Schedule the next lightning strike
      startLightning();
    }, time);
  }
  else if(!lightningOn){
    // if lightning is off, hide the lightning svg object
    lightningObject.style.display = "none";
    clearTimeout(lightningStarter);
    thunderSound.pause();
    strike.pause();
    return;
  }
}


function handleKeyDown(event){
  if (isMoving && keyboardEnabled){
      var name = event.key;
      if (name == "a" || name == "ArrowLeft") {
        xElements.forEach((element) => {
          let dir = 20;
          xCircleLeft = parseInt(element.getAttribute("cx"));
          x1BobLeft = parseInt(element.getAttribute("x1"));
          x2BobLeft = parseInt(element.getAttribute("x2"));
          xBobLeft = parseInt(element.getAttribute("x"));
          element.setAttribute("cx", String(xCircleLeft - dir));
          element.setAttribute("x1", String(x1BobLeft - dir));
          element.setAttribute("x2", String(x2BobLeft - dir));
          element.setAttribute("x", String(xBobLeft - dir));
          bdX = body1.getAttribute("x1");
        });
      }
      if (name == "d" || name == "ArrowRight") {
        xElements.forEach((element) => {
          xCircleRight = parseInt(element.getAttribute("cx"));
          x1BobRight = parseInt(element.getAttribute("x1"));
          x2BobRight = parseInt(element.getAttribute("x2"));
          xBobRight = parseInt(element.getAttribute("x"));
          element.setAttribute("x1", String(x1BobRight + 20));
          element.setAttribute("x2", String(x2BobRight + 20));
          element.setAttribute("cx", String(xCircleRight + 20));
          element.setAttribute("x", String(xBobRight + 20));
          bdX = body1.getAttribute("x1");
        });
      }
      let XArray = [];
      xElements.forEach((element) => {
        XArray.push(parseInt(element.getAttribute("x1")));
      });
      maxWidth = svg.getAttribute("width");
      const minWidth = 0;
      let isOutOfBoundsRight = false;
      let isOutOfBoundsLeft = false;
      for (let u = 0; u < XArray.length; u++) {
        if (XArray[u] > maxWidth) {
          isOutOfBoundsRight = true;
          break;
        }
        if (XArray[u] < minWidth) {
          isOutOfBoundsLeft = true;
          break;
        }
      }

      if (isOutOfBoundsRight) {
        xElements.forEach((element) => {
          let dir = 20;
          element.setAttribute("x1", String(parseInt(element.getAttribute("x1")) - dir));
          element.setAttribute("x2", String(parseInt(element.getAttribute("x2")) - dir));
          element.setAttribute("cx", String(parseInt(element.getAttribute("cx")) - dir));
          element.setAttribute("x", String(parseInt(element.getAttribute("x")) - dir));
          bdX = body1.getAttribute("x1");
        });
      }
      if (isOutOfBoundsLeft) {
        xElements.forEach((element) => {
          let dir = 20;
          element.setAttribute("x1", String(parseInt(element.getAttribute("x1")) + dir));
          element.setAttribute("x2", String(parseInt(element.getAttribute("x2")) + dir));
          element.setAttribute("cx", String(parseInt(element.getAttribute("cx")) + dir));
          element.setAttribute("x", String(parseInt(element.getAttribute("x")) + dir));
          bdX = body1.getAttribute("x1");
        });
      }
      bdX = parseInt(body1.getAttribute("x1"));
    }
}


// variable that determines the selected difficulty
let selectedDifficulty = null;

// a function that sets the level of difficulty for the user
function levelOfDifficulty() {
  let isClicked = false;
  let easy = document.getElementById("easy");
  let medium = document.getElementById("medium");
  let impossible = document.getElementById("impossible");

  easy.addEventListener("click", () => {
    if (selectedDifficulty !== 'easy') {
      isClicked = true;
      clearInterval(rainGenerater);
      rainGenerater = setInterval(generateRain, 600);
      clearInterval(rainMovement);
      rainMovement = setInterval(moveRain, 35)
      selectedDifficulty = 'easy';
    }
  });

  medium.addEventListener("click", () => {
    if (selectedDifficulty !== 'medium') {
      isClicked = true;
      clearInterval(rainGenerater);
      rainGenerater = setInterval(generateRain, 400);
      clearInterval(rainMovement);
      rainMovement = setInterval(moveRain, 25)
      selectedDifficulty = 'medium';
    }
  });

  impossible.addEventListener("click", () => {
    if (selectedDifficulty !== 'impossible') {
      isClicked = true;
      clearInterval(rainGenerater);
      rainGenerater = setInterval(generateRain, 350);
      clearInterval(rainMovement);
      rainMovement = setInterval(moveRain, 15)
      selectedDifficulty = 'impossible';
    }
  });

  if (!isClicked) {
    clearInterval(rainGenerater);
    rainGenerater = setInterval(generateRain, 600);
    clearInterval(rainMovement);
    rainMovement = setInterval(moveRain, 20)
  }
}


function generateRain() {
    const raindrop = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    raindrop.setAttribute("class", "raindrop");
    raindrop.setAttribute("cx", `${Math.random() * 100}%`);
    raindrop.setAttribute("cy", "100");
    raindrop.setAttribute("r", "10");
    raindrop.setAttribute("fill", "blue")
    raindropsSVG.appendChild(raindrop);
    rainArray.push(raindrop);
}

function moveRain() {
    rainArray.forEach((raindrop) => {
      const cy = parseInt(raindrop.getAttribute("cy"));
      if (cy > 500) {
        raindrop.remove();
        const index = rainArray.indexOf(raindrop);
        rainArray.splice(index, 1);
      } else {
        raindrop.setAttribute("cy", `${cy + 2}`);
      }
    });
    checkCollision();
}



// function that increases the score of the user if it keeps surviving and avoiding the objects from the sky
function increaseScore(){
  // increment the score value by 1
  score = score + 1;
  // store that score into the "second text" of the user's robot screen
  document.getElementById("second-txt").textContent = parseInt(score);
}


function highestScore(){
  let max = scores[0];
  for(let u = 0; u < scores.length; u++){
    if(scores[u] > max){
      max = scores[u];
    }
  }
  maxScore.textContent = max;
}
var scoreOn = false;
function checkCollision() {
  const playerRect = robot.getBoundingClientRect();
  scoreOn = true;
  rainArray.forEach((raindrop) => {
    let rainRect = raindrop.getBoundingClientRect();
    if (
      (playerRect.left < rainRect.right &&
      playerRect.right > rainRect.left &&
      playerRect.top < rainRect.bottom &&
      playerRect.bottom > rainRect.top)
    ) 
    {
      isMoving = false;
      movePlayer();
      stopGame();
      scores.push(score);
      playAgain.style.display = "flex";
    }
  });
  if(scoreOn==true){
    currentScore.textContent = score;
  }  
  highestScore();
}

playAgainButton.addEventListener("click", () => {
  scoreOn = false;
  // Reset the score to 0
  score = 0;
  playAgain.style.display = "none";
  // Clear the currentScore text
  currentScore.textContent = "0";
  keyboardEnabled = true;
  isMoving = true
  //playAgainButton.disabled = true;
  Ready.disabled = true;

  // Remove all raindrop elements from the rainArray
  for (let i = 0; i < rainArray.length; i++) {
    rainArray[i].remove();
  }

  // Start the game again
  StartGame();
});




// set a variable to get the svg background color 
let svgBackground = document.getElementById("my-svg").style.backgroundColor;

// make a variable for the button clicker for 'set'
let set = document.getElementById("set_time");

// time of day function
function timeOfDay(){
  // create a variable that stores the user's value of what they enter
  let time_of_day = document.getElementById("time_of_day").value;
  
  // if the time of day is 'morning', make the svg background a morning color
  if(time_of_day === "morning"){
    document.getElementById("my-svg").style.backgroundColor = "#C7ECEA";
  }

  // if it is 'evening' that is selected, make the svg background a evening color
  else if(time_of_day === "evening"){
    document.getElementById("my-svg").style.backgroundColor = "cornflowerblue";
  }

  // if it is 'nighttime' selected, make it a nighttime color
  else if(time_of_day === "nighttime"){
    document.getElementById("my-svg").style.backgroundColor = "black";
  }
}



function StartGame() {
  levelOfDifficulty();
  second_txt.textContent = "0";
  movePlayer();
  generateRain();
  moveRain();
  starter = setInterval(increaseScore, 2000);
  audioOn = true;
  Ready.disabled = true;
  Ready.style.display = "none";
  Ready.disabled = true;
  lightningOn = true;
  document.querySelector("#game-music").play();
  lightningObject.style.display = "none";
  startLightning();
}

// let the Ready variable signify the ready button
let Ready = document.getElementById("ready");

// When ready is selected, start the game
Ready.addEventListener("click", StartGame);

// use 'set' as a selection option for the time of day when clicked as to confirm and verify option
set.addEventListener("click", timeOfDay);
