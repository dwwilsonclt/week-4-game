$(document).ready(function(){
    var gamesWon = 0;                                               //global accumulator of games won
    var gamesLost = 0;                                              //global accumulator  of games lost
    var crystalPoints =[0,0,0,0];                                   //global array of random crystal values reset each game
    var playerTotal = 0;                                            //global total accumulator for current game 
    var gameTarget = 0;                                             //global random game target reset each game
    var gameOver = false;                                           //flag to handle game transitions status messages
    startaGame();                                                   //function which initiates game
   
    $("#target-number").text("Target Number is " + gameTarget);     //set initial status
    $("#status2").text("You have won " + gamesWon + " games");
    $("#status3").text("You have lost " + gamesLost + " games");
    $("#current-score").text(playerTotal);

 
//================================================================
    $("img#choice").on("click", function() {                        //main click function to capture player selections
    var $pickedChoice = $(this);

    var pickedChoiceValue = $pickedChoice.attr("value");            //detects which crystal (0 thru 3) was depressed
   if (gameOver){                                                  //check flag to change status if new game (remove old game status)
        playerTotal = 0;
        gameOver = false;
        $("#tot-score-status").text("Your total score this game is:");
        $("#target-number").text("The Target Number is " + gameTarget);
        $("#status1").text("");   
    }
    playerTotal = playerTotal + crystalPoints[pickedChoiceValue];   //add points for selected crystal to current game total
    $("#current-score").text(playerTotal);                          //update status for current score
    if (playerTotal === gameTarget){                                //game won code follows (including status update)
        gamesWon++;
        $("#status1").text("You won the game!!!");
        $("#game-log").append("<tr><td>" + gameTarget + "</td><td>" + playerTotal + "</td><td>WIN</td></tr>");
        gameOver = true;
        startaGame();   
        $("#target-number").text(" New Game Target Number is " + gameTarget);    
        $("#tot-score-status").text("Your final score last game was: ");
        
    } else {
        if (playerTotal > gameTarget) {                             //game lost code follows (including status update)
        gamesLost++;
        $("#status1").text("You lost the game!!!");
        $("#game-log").append("<tr><td>" + gameTarget + "</td><td>" + playerTotal + "</td><td>LOSS</td></tr>");
        gameOver = true;
        startaGame();     
        $("#target-number").text(" New Game Target Number is " + gameTarget);   
        $("#tot-score-status").text("Your final score last game was: ");
        } 
    }
    $("#status2").text("You have won " + gamesWon + " games");      //status code for game to be continued 
    $("#status3").text("You have lost " + gamesLost + " games");
    $("#current-score").text(playerTotal);

    });

    //==============================================================
    function startaGame(){                                          //function to start a game

        var pickedArray = [];                                       //array to track unique random numbers selected 

        do {                                                        //code follows to pick game target 12 to 120; repeats if less than 19
            gameTarget = Math.floor(Math.random() * 120) +1 ;
        }
        while (gameTarget < 19);

        for (var i = 0; i < crystalPoints.length; i++) {            //code follows to pick random crystal values between 1 and 12
            
            do{                                                     //this code ensures no duplicate random picks are selected (repeats if already selected)
                var numberPickedFlag = false;                       //flag set to manage iterations through do loop
                numberPicked = Math.floor(Math.random() * 12) +1 ;           
                for (var y = 0; y < pickedArray.length; y++) {      //loop through the random numbers already selected
                   
                    if (numberPicked === pickedArray[y]){           //check if the number has already been selected
                        numberPickedFlag = true;                    //will loop through again and select a different random number
                    }
                }
            }
            while (numberPickedFlag);

            crystalPoints[i] = numberPicked;                        //unique random number between 1 and 12 selected, store in the next crystal points array
            pickedArray.push(numberPicked);

        }
    }
});