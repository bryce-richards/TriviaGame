// array to be used for object questions
var questions = [];
// hints
var hints;
// boolean to determine if guess was correct or not
var correctGuess;
// counter of correct answers
var correctGuesses;
// counter of wrong answers
var wrongGuesses;
// counter of unasnwered questions
var unansweredQuestions;
// correct answer
var correctAnswer;
// variable for placement of correct answer
var correctAnswerLocation;
// current question number
var questionNumber;
// current question object
var currentQuestion;
// user's guess
var currentAnswer;
// current time for the round
var currentTime;
// timeout counter
var counter;
// time left
var timeLeft;
// div shortcuts
var questionDiv = $("#question");
var questionNumberDiv = $("#questionNumber");
var answerDiv = $(".answer");
var correctAnswerDiv = $(".correct");
var hintsDiv = $("#hintsLeft");
var timeLeftDiv = $("#timeLeft");

/* NEW GAME OBJECT */
function newGame() {
    // questions and answers
    questions = [{
        question: "What is Aragorn's nickname?",
        correctAnswer: "Strider",
        wrongAnswers: [
            "Shadow",
            "Half-Blood",
            "Prince"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }, {
        question: "Question",
        correctAnswer: "Answer",
        wrongAnswers: [
            "Answer1",
            "Answer2",
            "Answer3"
        ]
    }];

    // set number of hints per game
    hints = 3;
    // reset questionNumber
    questionNumber = 0;
    // set correctGuess to false
    correctGuess = false;
    // reset correctCuesses counter
    correctGuesses = 0;
    // reset wrongGuesses counter
    wrongGuesses = 0;
    // reset unansweredGuesses counter
    unansweredGuesses = 0;


    // new question function
    function newQuestion(array) {
        // set timer to 10 seconds
        timeLeft = 10;
        // increase question number by 1
        questionNumber++;
        // add question number to page
        questionNumberDiv.text(questionNumber);
        // reset answer divs
        answerDiv.each(function(i) {
            $(this).removeClass("correct").addClass("wrong");
        });
        // start timer
        // startTimer();
        // get question object
        currentQuestion = array[0];
        // currentQuestion = array[Math.floor(Math.random() * array.length)];
        // remove question object from array
        // add question to html page
        questionDiv.html("<p>" + currentQuestion.question + "</p>");
        // pick a random number from 1-4 to add correct answer to
        correctAnswerLocation = Math.floor(Math.random() * 3) + 1;
        // remove wrong answer class and add correct answer class to div and add correct answer to html page
        $("#answer" + correctAnswerLocation).removeClass("wrong").addClass("correct").html("<p>" + currentQuestion.correctAnswer + "</p>");
        // populate remaining incorrect answers on page
        $(".wrong").each(function(i) {
            $(this).html("<p>" + currentQuestion.wrongAnswers[i] + "</p>");
        });
        answerDiv.click(function() {
            if ($(this).hasClass("correct")) {
                alert("Yay!");
            } else {
                alert("No...");
            }
        });
        array.splice(array.indexOf(currentQuestion), 1);

    }

    // begin first question
    newQuestion(questions);

}
newGame();

// // timer function to decrease the time left every second
// function startTimer() {
//     counter = setInterval(timeDown, 1000);
// }
//
// // The decremeent function.
// function timeDown() {
//     // Decrease number by one.
//     timeLeft--;
//     // Show the number in the #show-number tag.
//     timeLeftDiv.text(timeLeft + " seconds");
//
//     // Once number hits zero...
//     if (timeLeft === 0){
//         // ...run the stop function.
//         timesUp();
//         // Alert the user that time is up.
//         alert('Time Up!')
//     }
// }
// // The stop function
// function timesUp() {
//     // Clears our "counter" interval.
//     // We just pass the name of the interval
//     // to the clearInterval function.
//     clearInterval(counter);
// }

