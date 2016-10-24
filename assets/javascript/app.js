// array to be used for object questions
var questions = [];
// hints
var hints;
// counter of correct answers
var correctGuesses;
// counter of wrong answers
var wrongGuesses;
// counter of unanswered questions
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
// total number of questions
var totalQuestions;
// width of span
var width;
// div shortcuts
var progressBarDiv = $(".progress");
var questionDiv = $("#question");
var questionNumberDiv = $("#questionNumber");
var answerDiv = $(".answer");
var correctAnswerDiv = $(".correct");
var hintsSpan = $("#hintsLeft");
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
    // get total number of questions
    totalQuestions = questions.length;
    // set width of progress bar updates
    width = (1/totalQuestions) * 100;
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
    // add total hints to page
    hintsSpan.text(hints);

    // load first question
    newQuestion(questions);

    // new question function
    function newQuestion(array) {
        // reset time
        timeLeftDiv.text("10 seconds");
        // updated progress bar
        function progressBar(answer) {
            if (answer === true) {
                progressBarDiv.append("<div class='progress-bar progress-bar-success' style='width: " + width + "%'></div>")
            }
            else if (answer === false) {
                progressBarDiv.append("<div class='progress-bar progress-bar-danger' style='width: " + width + "%'></div>")
            } else {
                progressBarDiv.append("<div class='progress-bar progress-bar-warning' style='width: " + width + "%'></div>")
            }
        }
        // timer function
        function startTimer() {
            counter = setInterval(timeDown, 1000);
        }
        // decrement function.
        function timeDown() {
            // decrease number by one of seconds by one.
            timeLeft--;
            // show the number of seconds left.
            timeLeftDiv.text(timeLeft + " seconds");

            // Once number hits zero...
            if (timeLeft === 0){
                // run the stop function.
                timesUp();
                // update progress bar
                progressBar();
            }
        }
        // stop function
        function timesUp() {
            // Clears our "counter" interval.
            // We just pass the name of the interval
            // to the clearInterval function.
            clearInterval(counter);
        }

        // set timer to 10 seconds
        timeLeft = 10;
        // increase question number by 1
        questionNumber++;console.log(questionNumber);
        // add question number to page
        questionNumberDiv.text(questionNumber);
        // reset answer divs
        answerDiv.each(function(i) {
            $(this).removeClass("correct").addClass("wrong").css({pointerEvents: "auto"});
        });
        // start timer
        startTimer();
        // get question object
        currentQuestion = array[0];
        // currentQuestion = array[Math.floor(Math.random() * array.length)];
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
            timesUp();
            if ($(this).hasClass("correct")) {
                correctGuesses++;
                correctGuess = true;
            } else {
                correctGuess = false;
                console.log("wrong");
                wrongGuesses++;
            }
            progressBar(correctGuess);
            answerDiv.each(function(i) {
                $(this).css({pointerEvents: "none"});
            });
            // remove question object from array
            array.splice(array.indexOf(currentQuestion), 1);
            setTimeout(function() {
                newQuestion(questions);
            }, 2000);
        });


    }

    // begin first question

}
newGame();



