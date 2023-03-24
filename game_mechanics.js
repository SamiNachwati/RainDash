// SA0001: I Sami Nachwati, 000879289 certify that this material is 
// my original work. No other person's work has been used without due 
// acknowledgement. I have not made my work available to anyone else.
// Author: Sami Nachwati
// Student ID: 000879289
// File: game_mechanics.js
// description: the game mechanics of the game's functionality 


// defining the svg elements and or other variables that will be used
const svg = document.querySelector("#my-svg");

// the sky of the svg world
const sky = document.querySelector("#sky");

// the specific elements which move when user clicks keyboard buttons
const xElements = document.querySelectorAll(".person");

// the raindropSVG holding the raindrops themselves
const raindropsSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// assigning the raindrop SVG to an id called "raindrops-svg"
raindropsSVG.setAttribute("class", "raindrops-svg");

// appending the raindrop SVG to our total SVG TEMPLATE
svg.appendChild(raindropsSVG);


// array storing circles
const rArray = [];

// defining the rights and the lefts of the movement for the robots' body
let xCircleRight;
let x1BobRight;
let x2BobRight;
let xCircleLeft;
let x1BobLeft;
let x2BobLeft;
let xBobLeft;
let xBobRight;


// an interval variable which starts the rain function in an interval
let rainGenerater;


// the rainMovment variable which runs the rainMovemnet in an interval
let rainMovement;

// the max Width of the screen
let maxWidth;

// the score of the user
let score = 0;

// an array holding rain svg objects
const rainArray = [];

// obtaining the wheel object
const wheel = document.querySelector("#wheel");

// obtaining the inner wheel object
const inner_wheel = document.querySelector("#inner-wheel");

// obtaining the line object with a large line width
const body1 = document.querySelector("#body1");

// the first text of the screen on the robot
const first_txt = document.querySelector("#first-txt");

// the "score" text of the robot which changes 
const second_txt = document.querySelector("#second-txt");

// the screen which is the black background on the robot representing the screen
const screen = document.getElementById("screen");



// a method to resize the browser so there is no packing space left over
function resizeWindow(){

  // when the user loads or changes or modifies the web browser in any way, still keep the same adjustment of the screen
  svg.setAttribute("width", String(parseInt(window.innerWidth)));

  // set the width of the sky to the inner width of the user's window inner width
  sky.setAttribute("width", String(parseInt(window.innerWidth)));

  // set the maxWidth to the svg's width
  maxWidth = svg.getAttribute("width");
}


// call the resizeWindow function when user resizes page
window.addEventListener("resize", resizeWindow);

// call the resizeWindow function when user decides to load page
window.addEventListener("load", resizeWindow);


let bdX = parseInt(body1.getAttribute("x1"));
let bdY = parseInt(body1.getAttribute("y1"));
// function to make checks for if the player makes a move left or right, then, move the player in that direction
function movePlayer(){
  // when user clicks a keybind
  document.addEventListener("keydown", (event) => {
    var name = event.key;
    // if that keybind is "a" or the Left Arrow Key
    if (name == "a" || name == "ArrowLeft") {
      // move left, push the elements to the left by 20
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

    // if the player clicks "d" or the Right Arrow Key
    if (name == "d" || name == "ArrowRight") {
      //move right, push the elements to the right by 20
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

    // array to hold the x position values
    let XArray = [];

    // for each of the elements, if it has an x1, add it to the array
    xElements.forEach((element) => {
      XArray.push(parseInt(element.getAttribute("x1")));
    });
    
    // set the widths of both the svg, sky and maxWidth again
    svg.setAttribute("width", String(window.innerWidth));
    sky.setAttribute("width", String(window.innerWidth));
    maxWidth = svg.getAttribute("width");

    // set the minimum width to 0
    const minWidth = 0;

    // set boolean flags to check if the user is out of bounds
    let isOutOfBoundsRight = false; 
    let isOutOfBoundsLeft = false;

    // for any x1 element in the array
    for (let u = 0; u < XArray.length; u++) {
      // if it is past the maxWidth, set isOutOfBoundsRight to true, and the other boolean flag to false
      if (XArray[u] > maxWidth){
        isOutOfBoundsRight = true;
        isOutOfBoundsLeft = false;
        break;
      }
      // if it is out of bounds before the minWith, set isOutOfBoundsLeft to true, and the other boolean flag to false
      if(XArray[u] < minWidth){
        isOutOfBoundsLeft = true;
        isOutOfBoundsRight = false;
        break;
      }
    }

    // if the element was out of bounds on the right
    if (isOutOfBoundsRight) {
      // for each element
      xElements.forEach((element) => {
        xCircleRight = parseInt(element.getAttribute("cx"));
        x1BobRight = parseInt(element.getAttribute("x1"));
        x2BobRight = parseInt(element.getAttribute("x2"));
        xBobRight = parseInt(element.getAttribute("x"));
        // check if any was past the boundary, if so, make a call to reset it to the minWidth starting point
        if (xCircleRight > maxWidth || x1BobRight > maxWidth || x2BobRight > maxWidth || xBobRight > maxWidth) {
          element.setAttribute("cx", String(minWidth));
          element.setAttribute("x1", String(minWidth));
          element.setAttribute("x2", String(minWidth));
          element.setAttribute("x", String(minWidth - 25));
        } 
      });
    }

    // if it was out of bounds are the lefthand side
    if (isOutOfBoundsLeft) {
      // for each element
      xElements.forEach((element) => {
        xCircleLeft = parseInt(element.getAttribute("cx"));
        x1BobLeft = parseInt(element.getAttribute("x1"));
        x2BobLeft = parseInt(element.getAttribute("x2"));
        xBobLeft = parseInt(element.getAttribute("x"));
        // check if it was less than the minimum width, if it was, set it to the maxWidth al the way at the end
        if (xCircleLeft < minWidth || x1BobLeft < minWidth || x2BobLeft < minWidth || xBobLeft < minWidth) {
          element.setAttribute("cx", String(maxWidth));
          element.setAttribute("x1", String(maxWidth));
          element.setAttribute("x2", String( maxWidth));
          element.setAttribute("x", String( maxWidth-25));
        } 
      });
    }
  }, false);
}

// function that generates the rain
function rain() {
  // in the range of 10
  for (let i = 0; i < 10; i++) {
    // create circle objects
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // set the class attribute of this circle to the class name of "raindrops"
    circle.setAttribute("class", "raindrops");
    // set the CX value to a random integer value on the canvas Width
    circle.setAttribute("cx", String(parseInt((2000 * Math.random()) + 1)));
    // set the circle cy to 100
    circle.setAttribute("cy", "100");

    // set the radius to 7
    circle.setAttribute("r", "7");

    rArray[i] = circle;
    // add the circle "raindrop" objects to the raindropsSVG
    raindropsSVG.appendChild(circle);

    // also add the circle in an array;
    rainArray.push(circle);
  }
}

// set boolean flag to check if the game is over
let gameisOver = false;

// function that moves the rain objects
function moveRain(){
  // create a constant variable called raindrops that gets all the raindrop objects
  const raindrops = document.querySelectorAll(".raindrops");
  // for each of those rain objects 
  let isHit = false;
  let numberOfHits = 0;
  raindrops.forEach((element) => {
    // get the cy value of that rain
    let rainYaxis = parseInt(element.getAttribute("cy"));
    // set that cy value to its inital value + a random integer value in the range of (1, 70) 
    element.setAttribute("cy", String(rainYaxis + parseInt((Math.random()*70))+1));  
    // check if the rain touches the robot, if so, increase the number of hits 
    if ((parseInt(element.getAttribute("cx")) >= (parseInt(bdX)-40)) && (parseInt(element.getAttribute("cx")) <= (parseInt(bdX) + 40)) && (parseInt(element.getAttribute("cy")) + parseInt(element.getAttribute("r")) >= parseInt(bdY)+50)) {
      numberOfHits++;
    }
    // if the rain's Y axis passes 750, remove the rain element
    if(rainYaxis>=750){
      element.remove();
    } 
  });
  // if the number of hits is 1, meaning, if ONE rain object comes into contact with the robot, set isHit to true
  if(numberOfHits === 1){
    isHit = true;
  }
  // if isHit is true, set gameisOver to true
  if (isHit) {
    gameisOver = true;
  }
}

// method to reload the page when the player looses
function reloadPage(){
  location.reload();
}


// game ot end the game
function stopGame(){
  // alert the user they lost, also, track their recent score in a message. 
  alert("You lose!" + "\nYou got a score of " + score + "!\nTo play again, press the ok button.");
  // then, restart the game
  setTimeout(reloadPage, 500);
}

// function that checks if the game is over
function checkGameOver() {
  // if gameisOver is true, call the stopGame() function
  if(gameisOver===true){
    stopGame();
  } 
  // otherwise, do not stop the game
  else {
    requestAnimationFrame(checkGameOver);
  }
}
//source: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
requestAnimationFrame(checkGameOver);



// get the thunder sound, lighting SVG, and the lighting sound
const thunderSound = document.getElementById("thunder");
const lightningSVG = document.getElementById("lightning");
const strike = document.getElementById("strike");


// function that plays the sound of thunder
function playThunder(){
  thunderSound.play();
}

// function that plays the sound of lighting
function playStrike(){
  strike.play();
}

// function that increases the score of the user if it keeps surviving and avoiding the objects from the sky
function increaseScore(){
  // increment the score value by 1
  score = score + 1;
  // store that score into the "second text" of the user's robot screen
  document.getElementById("second-txt").textContent = parseInt(score);
}

// variable that determines the selected difficulty
let selectedDifficulty = null;

// a function that sets the level of difficulty for the user
function levelOfDifficulty(){
  // the difficulty ranges from easy -> medium -> impossible
  let easy = document.getElementById("easy");
  let medium = document.getElementById("medium");
  let impossible = document.getElementById("impossible");
  // if the user selects "easy" as an option
  easy.addEventListener("click", ()=>{
    //if the selectedDifficulty is not already easy
    if (selectedDifficulty !== 'easy') {
      // clear both the rainGenerater interval and the rainMovement interval
      clearInterval(rainGenerater);
      clearInterval(rainMovement);
      // set a new interval for both being slower
      rainGenerater = setInterval(rain, 1000);
      rainMovement = setInterval(moveRain, 120);
      // then make the selectedDifficulty equal to 'easy'
      selectedDifficulty = 'easy';
    }
  })
  // if the user clicks medium as an option
  medium.addEventListener("click", ()=>{
    // if the selected difficulty is not already medium
    if (selectedDifficulty !== 'medium') {
      // clear both intervals of the rainGenerater and rainMovement
      clearInterval(rainGenerater);
      clearInterval(rainMovement);
      // set them to a little more of a faster past
      rainGenerater = setInterval(rain, 900);
      rainMovement = setInterval(moveRain, 100);
      // then make the selectedDifficulty equal to 'medium'
      selectedDifficulty = 'medium';
    }
  })

  // if the user clicks the impossible button
  impossible.addEventListener("click", ()=>{
    // if the selected difficulty is not already impossible
    if (selectedDifficulty !== 'impossible') {
      // clear any intervals that may be running between the rain movements and generaters
      clearInterval(rainGenerater);
      clearInterval(rainMovement);
      // set them to a much fast pace, making it more difficult to avoid rain
      rainGenerater = setInterval(rain, 800);
      rainMovement = setInterval(moveRain, 75);
      // make the selectedDifficulty equal to 'impossible'
      selectedDifficulty = 'impossible';
    }
  })
}


// function that starts the lightning
function startLightning() {
  // Generate a random time between 5 and 15 seconds for the next lightning strike
  const time = Math.floor(Math.random() * 10000) + 5000;
  // set timouts for the thunder/lightning sounds
  setTimeout(function() {
    // Play the thunder sound
    setTimeout(playThunder, parseInt(time-2000));
    // Then play the lightning strike thereafter  
    setTimeout(playStrike, parseInt(time-1000));
    // Show the lightning SVG
    setTimeout(()=>{
      let p = parseInt(Math.random()*window.innerWidth);
      lightningSVG.setAttribute("points", p + "," + 100 + " " + (p+200) + "," + 600 + " " + (p+400) + "," + 800 + " " + (p+120) + "," + 185);
      lightningSVG.style.display = "block";
    }, time-500);  
    // then hide the lighting svg object
    setTimeout(function() {
      lightningSVG.style.display = "none";
    }, 500);
    
    // Schedule the next lightning strike
    startLightning();
  }, time);
}

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

// function that begins the game
function StartGame() {
  // start by allowing player movement
  movePlayer();
  // let rain appear
  rain();
  // call the function to let the user choose the difficulty 
  levelOfDifficulty();

  // set the score interval every 3 seconds
  setInterval(increaseScore, 3000);
  // start the lightning
  startLightning();

  // disable the Ready button to prevent multiple clicks
  Ready.disabled = true;

  // enable the Ready button again once the game is finished
  setTimeout(function() {
    Ready.disabled = false;
  }, 10000); // set the time here for how long the game should run
}

// let the Ready variable signify the ready button
let Ready = document.getElementById("ready");
// When ready is selected, start the game
Ready.addEventListener("click", StartGame);

// use 'set' as a selection option for the time of day when clicked as to confirm and verify option
set.addEventListener("click", timeOfDay);
