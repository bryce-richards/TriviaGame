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
    question: "What is the name of the ent who helps Merry and Pippin",
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
    this.totalQuestions = this.questions.length;
    // set progress bar segment width
    this.progressWidth = (1 / this.totalQuestions) * 100;
    // set question number
    this.questionNumber = 0;
}

function Question(array) {
    this.index = array[Math.floor(Math.random() * array.length)];
    this.question = this.index.question;
    this.correctAnswer = this.index.correctAnswer;
    this.wrongAnswers = this.index.wrongAnswers;
}

function startGame() {
    // get array by theme
    $("#startGame").attr("disabled", "disabled");
    // create new Game object by theme
    currentGame = new Game("lotr");
    $("#statsTable").hide();
    $("#questionsDiv").fadeIn();
    newQuestion();
}

function newQuestion() {
    // create the question object and then assign to currentQuestion
    currentQuestion = new Question(currentGame.questions);
    // make answers clickable
    $(".answer").each(function(i) {
        $(this).removeClass("correct").addClass("hvr-fade wrong").css("pointer-events", "auto");
    });
    // add number of hints to page
    $("#hintsLeft").text(currentGame.hints);
    // increase questionNumber of game
    currentGame.questionNumber++;
    // add questionNumber to page
    $("#questionNumber").text(currentGame.questionNumber + " / " + currentGame.totalQuestions);
    // add question to page
    $("#question").text(currentQuestion.question);
    // pick random location for correct answer
    var correctLocation = Math.floor(Math.random() * currentQuestion.wrongAnswers.length) + 1;
    // add answers to page
    $("#answer" + correctLocation).removeClass("wrong").addClass("correct").text(currentQuestion.correctAnswer);
    $(".wrong").each(function(i) {
        $(this).text(currentQuestion.wrongAnswers[i]);
    });
    // enable hints button
    if (currentGame.hints > 0) {
        $("#hintsBtn").removeAttr("disabled");
    }
    // set time left
    timeLeft = 15;
    // start timer
    startTimer();
}

$(".answer").click(function() {
    timesUp();
    userGuess = $(this)
    checkAnswer(userGuess);
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
    if (status === "correct") {
        $("#progressbar").append("<div class='progress-bar progress-bar-success' style='width: " + currentGame.progressWidth + "%'></div>")
    }
    if (status === "wrong") {
        $("#progressbar").append("<div class='progress-bar progress-bar-danger' style='width: " + currentGame.progressWidth + "%'></div>")
    }
    if (status === "unanswered") {
        $("#progressbar").append("<div class='progress-bar progress-bar-warning' style='width: " + currentGame.progressWidth + "%'></div>")
    }
    // make answers unclickable
    $(".answer").each(function(i) {
        $(this).removeClass("correct").addClass("wrong").css("pointer-events", "none");
    });
    // remove question object from questions array
    currentGame.questions.splice(currentGame.questions.indexOf(currentQuestion.index), 1);
    // if questions remain, start new question after 1 second
    if (currentGame.questions.length > 0) {
        setTimeout(newQuestion, 200);
    }
    if (currentGame.questions.length === 0 ) {
        gameOver(currentGame);
    }

}

function startTimer() {
    $("#timeDiv").removeClass("panel-danger").addClass("panel-primary");
    $("#timeLeft").text(timeLeft + " seconds");
    counter = setInterval(timeDown, 1000);
}

function timeDown() {
    // reduce time left by one
    timeLeft--;
    // show the number of seconds left
    $("#timeLeft").text(timeLeft + " seconds");
    // update HTML
    if (timeLeft === 5) {
        $("#timeDiv").removeClass("panel-primary").addClass("panel-danger");
    }
    if (timeLeft === 0) {
        timesUp();
        currentGame.unanswered++;
        progressBar("unanswered");
    }
}

function timesUp() {
    // clear counter interval
    clearInterval(counter);
}

function gameOver(game) {
    $("#questionsDiv").fadeOut();
    $("#statsTable").fadeIn();
    $("#totalCorrect").text(currentGame.correctGuesses);
    $("#totalWrong").text(currentGame.wrongGuesses);
    $("#unanswered").text(currentGame.unanswered);
}

function highlightCorrect() {
    $(".correct").parent().removeClass("panel-default").addClass("panel-success");
    setTimeout(function() {
        $(".correct").parent().removeClass("panel-success").addClass("panel-default");
    }, 1000);
}

function highlightWrong(answer) {
    answer.parent().removeClass("panel-default").addClass("panel-danger");
    setTimeout(function() {
        answer.parent().removeClass("panel-danger").addClass("panel-default");
    }, 1000);
}

function checkAnswer(answer) {
    // stop timer
    timesUp();
    // if answer is correct
    if (answer.hasClass("correct")) {
        currentGame.correctGuesses++;
        setTimeout(progressBar("correct"), 1000);
    } else {
        highlightWrong(answer);
        highlightCorrect();
        currentGame.wrongGuesses++;
        setTimeout(progressBar("wrong"), 1000);
    }
}

// TODO after game is over, enable New Game button
// TODO fix timeout functions