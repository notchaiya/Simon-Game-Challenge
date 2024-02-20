var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var restart = false;

$(".btn").click(function handler() { 
    var userChosenColor = this.id;

    //pusd user selected colors to the array
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    animatePress(userChosenColor);
    playsound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function (e) { 
    if ( !restart ){
        if (e.key === "a" ){
    nextSeqence();
    restart = true;
    //Remove this event listener so it cannot be triggered again
    // $(document).off('keydown', handler)
    }
   }

});

function nextSeqence(){
    userClickedPattern=[];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playsound(randomChosenColour);
    $("." + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //h1 context
    $("h1").text("Level "+ level);
    level ++;
}

//    $("#" + nextSeqence()).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

function playsound(name){
    name = new Audio("sounds/"+ name + ".mp3");
    name.play();
}

function animatePress(userChosenColor){
   $("." + userChosenColor).addClass("pressed");
  
   setTimeout(function (){
    $("." + userChosenColor).removeClass("pressed");
   },100);
}

function checkAnswer(currentLevel){

    //  if(userClickedPattern.length===gamePattern.length){
    //      console.log("success");
    //      if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
    //          setTimeout(function (){
    //         nextSeqence();
    //      },1000)
    //      }         
    //  }else {
    //     console.log("fail")
    //  }
    var wrongSound = new Audio("sounds/wrong.mp3");

    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
        console.log("success");
        
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function (){
           nextSeqence();
        },1000)
        }         
    }else {
       $("body").addClass("game-over");
       setTimeout(function(){
         $("body").removeClass("game-over");
       },300)
       wrongSound.play();
       $("h1").text("Game Over, Press a to Restart");
       startOver();
    }
   
}

function startOver(){
    level = 0;
    gamePattern=[];
    // !restart;
    restart=false;
}