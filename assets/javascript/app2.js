// div shortcuts
var progressBarDiv = $(".progress");
var questionDiv = $("#question");
var questionNumberDiv = $("#questionNumber");
var answerDiv = $(".answer");
var hintsBtn = $("#hintsBtn");
var hintsSpan = $("#hintsLeft");
var timeLeftDiv = $("#timeLeft");

function useHint() {
    // pick a random number from 1 to the number of wrong answers
    var randomNumber = Math.floor(Math.random() * currentQuestion.wrongAnswers.length);
    $(".wrong").each(function(i) {
        if (randomNumber === i) {
            $(this).css({"pointer-events": "none", "background-color": "red"});
        }
    });
    hints--;
    hintsBtn.attr("disabled", "disabled");
}

/* NEW GAME OBJECT */
function newGame() {
    var questions = [{
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
    // total number of questions
    var totalQuestions;
    // width of span
    var width = (1/totalQuestions) * 100;
    // questions and answers
    var counter;

    // get total number of questions
    totalQuestions = questions.length;
    // set width of progress bar updates
    width = (1/totalQuestions) * 100;
    // set number of hints per game
    hints = 3;
    // reset hint button
    hintsBtn.removeAttr("disabled");
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
    // reset time
    timeLeftDiv.text("10 seconds");

    // update progress bar
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

    // new question function
    function newQuestion() {

        // user's guess
        var currentAnswer;
        // current time for the round
        var currentTime;
        // timeout counter

        // time left
        var timeLeft;

        // re-enable hint button if there are any hints left
        if (hints !== 0) {
            hintsBtn.removeAttr("disabled");
        } else {
            hintsBtn.attr("disabled", "disabled");
        }

        // set timer to 10 seconds
        timeLeft = 10;
        // increase question number by 1
        questionNumber++;
        // add question number to page
        questionNumberDiv.text(questionNumber);
        // reset answer divs
        answerDiv.each(function(i) {
            $(this).removeClass("correct").addClass("wrong").css("pointer-events", "auto");
        });
        // start timer
        startTimer();
        // get question object
        currentQuestion = questions[0];
        // currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        // add question to html page
        questionDiv.html("<p>" + currentQuestion.question + "</p>");
        // pick a random number from 1-4 to add correct answer to
        correctAnswerLocation = Math.floor(Math.random() * currentQuestion.wrongAnswers.length) + 1;
        // remove wrong answer class and add correct answer class to div and add correct answer to html page
        $("#answer" + correctAnswerLocation).removeClass("wrong").addClass("correct").html("<p>" + currentQuestion.correctAnswer + "</p>");
        // populate remaining incorrect answers on page
        $(".wrong").each(function(i) {
            $(this).html("<p>" + currentQuestion.wrongAnswers[i] + "</p>");
        });


        /* FUNCTIONS */

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
            // change font color when time hits 5 seconds
            if (timeLeft === 5) {
                timeLeftDiv.removeClass("text-warning").addClass("text-danger");
            }
            // stop timer when it hits 0
            if (timeLeft === 0) {
                // run the stop function.
                timesUp();
                // update progress bar
                progressBar();
                // load new question
                setTimeout(function() {
                    newQuestion(questions);
                }, 2000);
            }
        }

        // stop function
        function timesUp() {
            // Clears our "counter" interval.
            // We just pass the name of the interval
            // to the clearInterval function.
            clearInterval(counter);
        }

        // use hint function
        function useHint() {
            // pick a random number from 1 to the number of wrong answers
            var randomNumber = Math.floor(Math.random() * currentQuestion.wrongAnswers.length);
            $(".wrong").each(function(i) {
                if (randomNumber === i) {
                    $(this).css({"pointer-events": "none", "background-color": "red"});
                }
            });
            hints--;
            hintsBtn.attr("disabled", "disabled");
        }

        // user selects answer
        answerDiv.click(function() {
            timesUp();
            if ($(this).hasClass("correct")) {
                correctGuesses++;
                correctGuess = true;
            } else {
                // border fade on incorrect selection
                $(this).removeClass("hvr-fade").addClass("hvr-border-fade");
                $(this).trigger("mouseenter");
                setTimeout(function() {
                    $(this).trigger("mouseleave");
                    $(".correct").removeClass("hvr-border-fade").addClass("hvr-fade");
                }, 500);

                // ripple out effect on correct answer
                $(".correct").addClass("hvr-ripple-out");
                $(".correct").trigger("mouseenter");
                setTimeout(function() {
                    $(".correct").trigger("mouseleave");
                    $(".correct").removeClass("hvr-ripple-out");
                }, 500);
                correctGuess = false;
                wrongGuesses++;
            }
            progressBar(correctGuess);
            answerDiv.each(function(i) {
                $(this).css("pointer-events", "none");
            });
            // remove question object from array
            questions.splice(questions.indexOf(currentQuestion), 1);
            //setTimeout(function() {
                newQuestion();
            //}, 2000);
        });


    }


}
newGame();



