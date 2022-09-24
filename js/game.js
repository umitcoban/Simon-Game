var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var userClicked = 0;
var isGameOver = false;
const windowSize = $(window).width();
console.log(windowSize);
console.log("level : "+level);

$(document).ready(function (e) {
    if(windowSize < 960){
        $("h1").text("Press Button Key to Start");
        $("#phone-start-game").show();
    }else{
        $("#level-title").show();
        $("#phone-start-game").hide();
    }
});

$("#startGame").click(function(e){
    if(isGameOver===true){
        $("#level-title").show();
        $("#startGame").hide();
        startOver();
    }else {
        $("#level-title").show();
        $("#startGame").hide();
        nextSequence();
    }
});

$(document).keydown(function(e){
    if(isGameOver===true){
        startOver();
    }else if(level<=0 && e.key.toLowerCase() === "a"){
        nextSequence();
    }
});

$(".btn").click(function(e){
    var userChosenColour = $(this).attr("id");
    userChosen(userChosenColour);
});

function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audioSrc = "sounds/"+randomChosenColour+".mp3";
    playSound(audioSrc);
    setLevel();
}

function playSound(name){
    var playButtonAudio = new Audio(name);
    playButtonAudio.play();
}

function userChosen(colour){
    userClicked++;
    userClickedPattern.push(colour);
    var audioSrc = "sounds/"+colour+".mp3";
    animatePress(colour);
    playSound(audioSrc);
    if(isGameOver===false){
        checkAnswer(userClicked);
    }

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed").delay(100).queue(function(next){
        $(this).removeClass("pressed");
        next();
    })
}

function setLevel(){
    $("h1").text("level "+ level);
    level++;
}

function checkAnswer(currentUserClicked){
    if(userClickedPattern[currentUserClicked-1]===gamePattern[currentUserClicked-1]){
        if(gamePattern.length === currentUserClicked){
            setTimeout(function(){
                userClicked=0;
                userClickedPattern=[];
                nextSequence();
            },1500);
           
        }
    }else{
        gameOver();
    }
}

function gameOver(){
    level=0;
    isGameOver=true;
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over").delay(200).queue(function(next){
        $(this).removeClass("game-over");
        next();
    });

    if(windowSize < 960){
        $("h1").text("Game Over, Press button to Restart");
        $("#phone-start-game").show();
    }else{
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

function startOver() 
{
    isGameOver=false;
    level=0;
    userClicked=0;
    userClickedPattern=[];
    gamePattern=[];
    nextSequence();
}