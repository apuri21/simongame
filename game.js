// Array of button colors


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

// On click Function
$(".btn").click(function() {

var userChosenColour = $(this).attr("id");

userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress (userChosenColour);
checkAnswer(userClickedPattern.length-1);

});

// Keyboard Click Function 

$(document).keypress(function() {

  if (!started) {

$("#level-title").text("Level " + level);

  nextSequence();
  started = true;




}


});



// Function to generate  random number between 0 and 3 and store it in variable randomNumber

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


// Playing Sound Function

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
   audio.play(userClickedPattern);
}


// Animate Button Function

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


// Check Answer

function checkAnswer (currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {



    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
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

startOver();

  }

}

// Function to Restart the game by changing the values of level, gamepattern and started

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
