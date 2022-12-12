$(document).ready(function() {

    let buttonColours = ["red", "blue", "green", "yellow"];

    let gamePattern = [];
    let userClickedPattern = [];

    let started = true;
    let level = 1;
    

    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }


    function wrongButtonSound() {
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
    }


    function animatePress(currentColour) {

        $("#" + currentColour).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);

    }


    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            
            let count = 0;
            for (i = 0; i < gamePattern.length; i += 1) {
                
                if (gamePattern[i] === userClickedPattern[i]) {
                    count += 1;
                }
            } 
            if (count === gamePattern.length) {
                
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
            
        } else {
            
            $("h1").text("Game over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            wrongButtonSound();
            startOver();
        }
    }


    $(".btn").click(function() {

        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
    });


    $(document).keydown(function() {

        if (started) { 

            nextSequence();
            started = false;
        }
    });


    function nextSequence() {

        userClickedPattern = [];
        
        let randomNumber = Math.floor((Math.random() * 4));
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);

        $("#level-title").text("Level " + level);
        level += 1;
    }


    function startOver() {

        level = 1;
        gamePattern = [];
        started = true;
    }


});