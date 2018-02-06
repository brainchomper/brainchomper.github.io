var guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters;

/* start config options */
var availableLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var lives = 6;
var words = ["olly", "dog", "titan", "complex", "beer", "vodka", "lizard", "scientist"];
var messages = {
	win: 'You WON!',
	lose: 'Game Over!',
	guessed: ' has already been guessed, please try again...',
	validLetter: 'Please enter a letter from A-Z'
};
/* end config options */

/* choose a word */
var currentWord = words[Math.floor(Math.random() * words.length)];
var lettersGuessed = lettersMatched = '';
var numLettersMatched = 0;
var guesses = [];      // Stored guesses

/* Start game */
window.onload = setup();

document.onkeyup = function (e) {
	if (e.preventDefault) e.preventDefault();
	output.innerHTML = '';
	output.classList.remove('error', 'warning');
	guess = e.key;
	//guess = guessInput.value;

	/* does guess have a value? if yes continue, if no, error */
	if (guess) {
		/* is guess a valid letter? if so carry on, else error */
		if (availableLetters.indexOf(guess) > -1) {
			/* has it been guessed (missed or matched) already? if so, abandon & add notice */
			if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
				output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
				output.classList.add("warning");
				$('#letter').val("");
			}
			/* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
			else if (currentWord.indexOf(guess) > -1) {
				var lettersToShow;
				lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

				for (var i = 0; i < lettersToShow.length; i++) {
					lettersToShow[i].classList.add("correct");
					$('#letter').val("");
				}

				/* check to see if letter appears multiple times */
				for (var j = 0; j < currentWord.length; j++) {
					if (currentWord.charAt(j) === guess) {
						numLettersMatched += 1;
					}
				}

				lettersMatched += guess;
				if (numLettersMatched === currentWord.length) {
					gameOver(true);
				}
			}
			else {
				lettersGuessed += guess;
				lives--;
				man.innerHTML = 'You Have ' + lives + ' Guesses Remaining';
				if (lives==5){
					// document.getElementById("#imageDiv").innerHTML =;
					$('#hangmanImg').attr('src', './assets/images/hangman1.png');
				};
				if (lives==4){
					// document.getElementById("#imageDiv").innerHTML =;
					$('#hangmanImg').attr('src', './assets/images/hangman2.png');
				};
				if (lives==3){
					// document.getElementById("#imageDiv").innerHTML =;
					$('#hangmanImg').attr('src', './assets/images/hangman3.png');
				};
				if (lives==2){
					// document.getElementById("#imageDiv").innerHTML =;
					$('#hangmanImg').attr('src', './assets/images/hangman4.png');
				};
				if (lives==1){
					// document.getElementById("#imageDiv").innerHTML =;
					$('#hangmanImg').attr('src', './assets/images/hangman5.png');
				};
				if (lives==0){
					// document.getElementById("#imageDiv").innerHTML =;
					$('#hangmanImg').attr('src', './assets/images/hangman6.png');
				};

				//Added 
				guesses.push(guess);
				document.getElementById("guessed").innerHTML = guesses;
				//console.log(guessed);
				//end added

				$('#letter').val("");
				if (lives == 0) gameOver();
			}
		}
		/* Not a valid letter, throw error */
		else {
			output.classList.add('error');
			output.innerHTML = messages.validLetter;
			$('#letter').val("");
		}
	}
	/* No letter, throw an error */
	else {
		output.classList.add('error');
		output.innerHTML = messages.validLetter;
	}
	return false;
};

function setup() {
	/* make #man and #output blank, create vars for later access */
	output = document.getElementById("output");
	man = document.getElementById("man");
	// guessInput = document.getElementById("letter");
	guessInput = document.getElementById("letter");

	man.innerHTML = 'You Have ' + lives + ' Guesses Remaining';
	output.innerHTML = '';

	document.getElementById("letter").value = '';

	letters = document.getElementById("letters");
	letters.innerHTML = '<li class="current-word">Current word:</li>';

	for (i = 0; i < currentWord.length; i++) {
		letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
		letters.insertAdjacentHTML('beforeend', letter);
	}
}



function gameOver(win) {
	if (win) {
		output.innerHTML = messages.win;
		output.classList.add('win');
	} else {
		output.innerHTML = messages.lose;
		output.classList.add('error');

	}
}