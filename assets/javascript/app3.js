// array of questions
var questions = [];
// lord of the rings questions
var lotrQuestions = [{
    question: "What is Aragorn's nickname?",
    correctAnswer: "Strider",
    wrongAnswers: [
        "Shadow",
        "Ranger",
        "The One"
    ]
}, {
    question: 'Who says, "Fly, You Fools!"',
    correctAnswer: "Gandalf",
    wrongAnswers: [
        "Sauruman",
        "Legolas",
        "Gimli"
    ]
}, {
    question: "What year was Fellowship of the Ring released?",
    correctAnswer: "2003",
    wrongAnswers: [
        "2004",
        "2001",
        "1999"
    ]
}, {
    question: "What is the name of the ent who helps Merry and Pippin>",
    correctAnswer: "Treebeard",
    wrongAnswers: [
        "Quickbeam",
        "Skinbark",
        "Leaflock"
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
var questionNumber;
var currentGame;
var currentQuestion;
var counter;
var timeLeft;
var userGuess;

function Game(theme) {
    // just in case I have multiple themes I want to use
    if (theme === "lotr") {
        this.questions = lotrQuestions;
    }
    // set number of hints
    this.hints = 3;
    // reset correctGuesses
    this.correctGuesses = 0;
    // reset wrongGuesses
    this.wrongGuesses = 0;
    // reset unaswered
    this.unanswered = 0;
    // get total number of questions
    this.totalQuestions = questions.length;
// set progress bar segment width
    this.progressWidth = (1 / this.totalQuestions) * 100;
}

function startGame() {
    // get array by theme
    $("#startGame").attr("disabled", "disabled");
    // create new Game object by theme
    currentGame = new Game("lotr");
    newQuestion();
    $("#questionDiv").show().animate("opacity", 1);

}

function Question(array) {
    this.index = array[Math.floor(Math.random() * array.length)];
    this.question = this.index.question;
    this.correctAnswer = this.index.correctAnswer;
    this.wrongAnswers = this.index.wrongAnswers;
}

function newQuestion() {
    // create the question object and then assign to currentQuestion
    currentQuestion = new Question(currentGame.questions);
    // increase questionNumber of game
    currentGame.questionNumber++;

    // add questionNumber to page
    $("questionNumber").text(currentGame.questionNumber);

    // add question to page
    $("#question").text(currentQuestion.question);

    // pick random location for correct answer
    var correctLocation = Math.floor(Math.random() * currentQuestion.wrongAnswers.length) + 1;

    // add answers to page
    $("#answer" + correctLocation).removeClass("wrong").addClass("correct").find("h3").text(currentQuestion.correctAnswer);
    $(".wrong").each(function(i) {
            $(this).find("h3").text(currentQuestion.wrongAnswers[i]);
    });

    // fade in questions table
    setTimeout(function() {
        $("#questionsDiv").animate("opacity", 1);
    }, 400);

    // remove question object from questions array
    currentGame.questions.splice(currentGame.questions.indexOf(currentQuestion.index), 1);

    // enable hints button
    if (currentGame.hints > 0) {
        $("#hintsBtn").removeAttr("disabled");
    }

    // make answers clickable
    $(".answer").each(function(i) {
        $(this).removeClass("correct").addClass("wrong").css("pointer-events", "auto");
    });

    // set time left
    timeLeft = 10;

    // start timer
    startTimer();
}

$(".answer").click(function() {
    timesUp();
    userGuess = $(this);
    // make each answer unclickable
    checkAnswer(userGuess, currentQuestion);
});


function useHint() {
    var randomNumber = Math.floor(Math.random() * currentQuestion.wrongAnswers.length);
    // update one of the wrong div
    $(".wrong").each(function(i) {
        if (randomNumber === i) {
            $(this).css({"pointer-events": "none", "background-color": "red"});
        }
    });
    currentGame.hints--;

    // update hints button
    $("#hintsBtn").attr("disabled", "disabled");
}

// update progress bar div based on answer validation
function progressBar(status) {
    if (status) {
        $("#progressbar").append("<div class='progress-bar progress-bar-success' style='width: " + currentGame.progressWidth + "%'></div>")
    }
    else if (!status) {
        $("#progressbar").append("<div class='progress-bar progress-bar-danger' style='width: " + currentGame.progressWidth + "%'></div>")
    } else {
        $("#progressbar").append("<div class='progress-bar progress-bar-warning' style='width: " + currentGame.progressWidth + "%'></div>")
    }
}

function startTimer() {
    counter = setInterval(timeDown, 1000);
}

function timeDown() {
    timeLeft--;
    // update HTML
    if (timeLeft === 5) {
        // update font
    }
    if (timeLeft === 0) {
        currentGame.unanswered++;
        progressBar("unanswered");
        timesUp();
    }
}

function timesUp() {

    // clear counter interval
    clearInterval(counter);

    // make answers unclickable
    $(".answer").each(function(i) {
        $(this).removeClass("correct").addClass("wrong").css("pointer-events", "none");
    });

    // if questions remain, start new question after 1 second
    if (currentGame.questions.length > 0) {
        setTimeout(function() {
            newQuestion();
            setTimeout(function() {
                $("#questionsDiv").animate("opacity", 0);
            }, 400);
        }, 1000)
    }

    if (currentGame.questions.length === 0 ) {
        setTimeout(function() {
            gameOver(currentGame);
            setTimeout(function() {
                $("#questionsDiv").fadeOut();
            }, 400);
        }, 1000)
    }
}

function gameOver(game) {
    $("#statsTable").fadeIn();
    $("#totalCorrect").text(currentGame.correctGuesses);
    $("#totalWrong").text(currentGame.wrongGuesses);
    $("#unanswered").text(currentGame.unanswered);
}

function highlightCorrect() {
    $(".correct").addClass("hvr-ripple-out");
    $(".correct").trigger("mouseenter");
    setTimeout(function() {
        $(".correct").trigger("mouseleave");
        $(".correct").removeClass("hvr-ripple-out");
    }, 1000);
}

function highlightWrong(answer) {
    answer.removeClass("hvr-fade").addClass("hvr-border-fade");
    answer.trigger("mouseenter");
    setTimeout(function() {
        answer.trigger("mouseleave");
        answer.removeClass("hvr-border-fade").addClass("hvr-fade");
    }, 1000);
}

function checkAnswer(answer) {
    // stop timer
    timesUp();

    // make answers unclickable
    $(".answer").each(function(i) {
        $(this).removeClass("correct").addClass("wrong").css("pointer-events", "none");
    });

    // set boolean to false
    var guessBool = false;
    // if answer is correct
    if (answer.hasClass("correct")) {
        guessBool = true;
        gameObject.correctGuesses++;
        // else, highlight correct answer
    } else {
        // border fade on incorrect selection
        highlightWrong(answer);
        // ripple out effect on correct answer
        highlightCorrect();
    }
    // update progress bar
    progressBar(guessBool);

    // remove question object from array
    setTimeout(function() {
        newQuestion();
        setTimeout(function() {
            $("#questionsDiv").animate("opacity", 0);
        }, 400);
    }, 1000);
}