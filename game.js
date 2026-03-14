var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var started = false;
var userClickedPattern = [];

$(document).keypress(function(event) {
    if (event.key === "a" && started === false) {
        $("#level-title").text("Level 1");
        started = true;
        nextSequence()
    }
$(document).on("touchstart", function() {
    if (started === false) {
        $("#level-title").text("Level 1");
        started = true;
        nextSequence();
    }
});

});

$(".btn").click(function() {
    var userColor = $(this).attr("id");
    userClickedPattern.push(userColor);
    playAudio(userColor);
  animatePress(userColor);

  checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Ниво " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
  playAudio(randomChosenColour);
}

function playAudio(currentColor) {
    var audi = new Audio("sounds/" + currentColor + ".mp3");
    audi.play();
}   
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $("h1").text("❌ Играта свърши ❌ натисни А или клик за рестарт 🔄");
        started = false;
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    var audioe = new Audio("sounds/wrong.mp3");
    audioe.play();
}