var questionList = [{
	question: " What year was Fry cryogenically frozen?",
	answerList: ["1998", "1999", "2000", "2001"],
	answer: 1
}, {
	question: "What species is Zoidberg?",
	answerList: ["Trisolian", "Nibblonian", "Shrimpkins‎", "Decapodian"],
	answer: 3
}, {
	question: "What was Fry' first job?",
	answerList: ["Fishy Joe's", "O'Grady's Pub", "Panucci's Pizza", "Limburger King"],
	answer: 2
}, {
	question: "Where is Amy From?",
	answerList: ["Brooklin", "Mars", "Omicron Persei 8", "Wormulon"],
	answer: 1
}, {
	question: "Who did Amy marry?",
	answerList: ["Kif", "Fnog", "Kug", "Yivo"],
	answer: 0
}, {
	question: "What vessel does Zapp Brannigan captain?",
	answerList: ["Planet Express Ship", "Land Titanic", "Kitten Class Attack Ship", "The Nimbus"],
	answer: 3
}, {
	question: "What does Nibler Poo?",
	answerList: ["Gold", "Uranium", "Dark Matter", "Anti-Matter"],
	answer: 2
}, {
	question: "What century is Futurama set in?",
	answerList: ["21st Century", "24th Century", "30th Century", "41th Century"],
	answer: 2
}, {
	question: "Who was the creator of Futurama?",
	answerList: ["Billy West", "Matt Groening", "Dan Harmon", "John DiMaggio"],
	answer: 1
}, {
	question: "What is the name of the Planet Express's Janitor?",
	answerList: ["Beni", "Vernon", "Curly", "Scruffy"],
	answer: 3
}];
var messages = {
	correct: "<h2>You Got It!</h2>",
	incorrect: "<h2>Wrong, Be Better!</h2>",
	finished: "<h2>You're Done, Let's See How You Did!</h2>"
}
var imgArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var currentQuestion;
var wrongAnswer;
var incorrectAnswer;
var unanswered = 0;
var seconds;
var time;
var answered;
var selected;

//play background song onload
$(document).ready(function () {
	$("#my_audio").get(0).play();
});
//end background song

//start game btn
$('#startBtn').on('click', function () {
	$(this).hide();
	$('.title').hide();
	newGame();
});
// $('#correctImage').on("click", function(){
// 	seconds=0;
// 	newQuestion()
// 	});
//reset btn
$('#restartBtn').on('click', function () {
	$(this).hide();
	newGame();
});
//start - new game
function newGame() {
	$('#finalMessage').empty();
	$('#correctCount').empty();
	$('#wrongCount').empty();
	$('#notAnswered').empty();
	$('#ender').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	wrongAnswer = 0;
	unanswered = 0;
	incorrectAnswer = 0;
	newQuestion();
}

//start new questions
function newQuestion() {
	$('#message').empty();
	$('#correctAnswer').empty();
	$('#correctImage').empty();
	$('.listOfAnswers').empty();
	answered = true;

	$('#currentQuestion').html('Question # ' + (currentQuestion + 1) + ' / ' + questionList.length);
	$('.question').html('<h2>' + questionList[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>');
		choices.text(questionList[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.listOfAnswers').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function () {
		selected = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();
	$('.listOfAnswers').empty();

	var rightAnswerText = questionList[currentQuestion].answerList[questionList[currentQuestion].answer];
	var rightAnswerIndex = questionList[currentQuestion].answer;
	$('#correctImage').html('<img src = "assets/images/' + imgArray[currentQuestion] + '.gif" width = "350px" class="img-responsive">');
	//checks to see correct, incorrect, or unanswered
	if ((selected == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((selected != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctAnswer').html('<h3>The correct answer was: ' + rightAnswerText +'</h2>');
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctAnswer').html('<h3>The correct answer was: ' + rightAnswerText +'</h2>');
		answered = true;
	}

	if (currentQuestion == (questionList.length - 1)) {
		setTimeout(scoreboard, 3000)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}
}
function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctAnswer').empty();
	$('#correctImage').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctCount').html("Correct Answers: " + correctAnswer);
	$('#wrongCount').html("Incorrect Answers: " + incorrectAnswer);
	$('#notAnswered').html("Unanswered: " + unanswered);
	$('#ender').html('<img src="./assets/images/ender.gif" alt="Ending Gif" class="img-responsive">');
	$('#restartBtn').addClass('reset');
	$('#restartBtn').show();
	$('#restartBtn').html('Start Over?');
}
