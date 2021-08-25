
//2.array holding the different sounds
let buttonColours = ["red", "blue", "green", "yellow"];

//array to hold sequence for game pattern and sequence for user clicked pattern. 
let gamePattern = [];
let userClickedPattern = [];

let started = false;

//track number of rounds played so fat
let level = 0;

//jquery start game with any keypress. 
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//when button clicked 

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// main function. if game pattern at current level in array same as userclicked at current level,initiate next sequence function
//with 1000 ms timeout. //if statement inside checkAnswer() check if most recent user answer is same as the game pattern.

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

    //reset the game. funcion below. 
      startOver();
    }
}

//when nextsequence funcition provoked level variable is incremented by 1 and the next sequence is prepared
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //1-random number between 0 and 3. var randomNumber selects random color from button color array.

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  //3-push the color to game pattern array 

  gamePattern.push(randomChosenColour);


  //4 animate button. with effects. and play sound. 
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//resets the game 
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//  font-family: 'Press Start 2P', cursive;


//next up: create 2 player expericne. 