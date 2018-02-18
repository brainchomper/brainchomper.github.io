$(document).ready(function () {
	// Global Variables
	var crystalVal1, crystalVal2, crystalVal3, crystalVal4;
	var wins = 0;
	var losses = 0;
	var randComputer;
	// counts user score
	var usrScore;

	//Functions
	startGame();
	function startGame() {
		// random number between 25 & 80

		randComputer = 25 + Math.floor(Math.random() * 55);
		crystalVal1 = 1 + Math.floor(Math.random() * 10);
		crystalVal2 = 1 + Math.floor(Math.random() * 10);;
		crystalVal3 = 1 + Math.floor(Math.random() * 10);
		crystalVal4 = 1 + Math.floor(Math.random() * 10);
		usrScore = 0;
		$('#winsCounter').html("Wins: " + wins);
		$('#lossesCounter').html("Losses: " + losses);
		$('#randomNumber').html(randComputer);
		$('#userScore').html("Score: " + usrScore);
		console.log("computer value " + randComputer);
		console.log("crystal1 val " + crystalVal1);
		console.log("crystal2 val " + crystalVal2);
		console.log("crystal3 val " + crystalVal3);
		console.log("crystal4 val " + crystalVal4);
		console.log("user score " + usrScore);
	}
	//end startGame

	function winOrLose() {
		// check if user has lost
		if (usrScore > randComputer) {
			losses++;
			console.log("User Lost");
			startGame();
		}

		// check if user has won
		if (usrScore == randComputer) {
			wins++;

			console.log("User Won");
			startGame();
		}
	}
	//end winOrLose

	//Main Game
	$(".crystal").on("click", function () {
		var clicked = $(this).attr("value");
		// console.log(clicked)
		if (clicked == "crystal1") {
			usrScore += crystalVal1;
		} else if (clicked == "crystal2") {
			usrScore += crystalVal2;
		} else if (clicked == "crystal3") {
			usrScore += crystalVal3;
		} else if (clicked == "crystal4") {
			usrScore += crystalVal4;
		}

		$("#userScore").html(usrScore);

		winOrLose();
	});
	//End Main Game

});

// When the player clicks on a crystal, it will add a specific amount of points to the player's total score. 

// Your game will hide this amount until the player clicks a crystal.
// When they do click one, update the player's score counter.

//The player wins if their total score matches the random number from the beginning of the game.

//The player loses if their score goes above the random number.

//The game restarts whenever the player wins or loses.

// When the game begins again, the player should see a new random number. Also, all the crystals will have four new hidden values. Of course, the user's score (and score counter) will reset to zero.

//The app should show the number of games the player wins and loses. To that end, do norefresh the page as a means to restart the game