// array of questions
var questions = [];
// lord of the rings questions
var lotrQuestions = [{
    question: "What is Aragorn's nickname?",
    correctAnswer: "Strider",
    wrongAnswers: [
        "Shadow",
        "Elfstone",
        "Númenórean"
    ]
}, {
    question: "How many Academy Awards did 'Return of the King' win?",
    correctAnswer: "11",
    wrongAnswers: [
        "9",
        "7",
        "6"
    ]
}, {
    question: "What year was the 'Fellowship of the Ring' film released?",
    correctAnswer: "2001",
    wrongAnswers: [
        "2004",
        "2003",
        "1999"
    ]
}, {
    question: "Which character's motto is 'Do Not Be Hasty'?",
    correctAnswer: "Treebeard",
    wrongAnswers: [
        "Gandalf",
        "Elrond",
        "Bilbo"
    ]
}, {
    question: "Who cut the One Ring from Sauron's hand?",
    correctAnswer: "Isildur",
    wrongAnswers: [
        "Elendil",
        "Gil-Galad",
        "Elrond"
    ]
}, {
    question: "What is the name of Aragorn's sword?",
    correctAnswer: "Andúril",
    wrongAnswers: [
        "Glamdring",
        "Anguirel",
        "Sting"
    ]
}, {
    question: "Legolas hails from which realm?",
    correctAnswer: "Northern Mirkwood",
    wrongAnswers: [
        "Lindon",
        "Lothlórien",
        "Rivendell"
    ]
}, {
    question: "What is Frodo's relation to Bilbo?",
    correctAnswer: "Second cousin once removed",
    wrongAnswers: [
        "Great uncle",
        "First cousin twice removed",
        "Uncle"
    ]
}, {
    question: "What is the name of Galadriel's husband?",
    correctAnswer: "Celeborn",
    wrongAnswers: [
        "Haldir",
        "Celebrimbor",
        "Oropher"
    ]
}, {
    question: "What was the name of the Balrog that Gandalf fought?",
    correctAnswer: "Durin's Bane",
    wrongAnswers: [
        "Gothmog",
        "Lungorthin",
        "Morgoth"
    ]
}];
var currentGame;
var currentQuestion;
var counter;
var timeLeft;

function Game(array) {
    // assign copy of array
    this.questions = array.slice(0);
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

function resetDisplay() {
    $("main").fadeIn(1000);
    $("#openingPage").fadeOut(1000);
    $("#statsTable").fadeOut(500);
    $("#progressbar").empty();
    $("#startGame").fadeOut(1000);
    setTimeout(function() {
        $("#questionsDiv").fadeIn(500);
    }, 500);
}

function startGame() {
    // create new Game object by theme
    currentGame = new Game(lotrQuestions);
    // reset display
    resetDisplay();
    // create new question
    newQuestion();
}

function newQuestion() {
    // create the question object and then assign to currentQuestion
    currentQuestion = new Question(currentGame.questions);
    // make answers clickable
    $(".answer").removeClass("correct").addClass("wrong").css("pointer-events", "auto");
    // add number of hints to page
    $("#hintsLeft").text(currentGame.hints);
    // increase questionNumber of game
    currentGame.questionNumber++;
    // add questionNumber to page
    $("#questionNumber").text(currentGame.questionNumber + " / " + currentGame.totalQuestions);
    // add question to page
    $("#question").text(currentQuestion.question).animate({opacity: '1'}, 500);
    // pick random location for correct answer
    var correctLocation = Math.floor(Math.random() * currentQuestion.wrongAnswers.length) + 1;
    // add answers to page
    $("#answer" + correctLocation).removeClass("wrong").addClass("correct").text(currentQuestion.correctAnswer);
    $(".wrong").each(function(i) {
        $(this).text(currentQuestion.wrongAnswers[i]);
    });
    $(".answer").animate({opacity: '1'}, 500);
    // enable hints button
    if (currentGame.hints > 0) {
        $("#hintsBtn").removeClass("disabled");
    }
    // set time left
    timeLeft = 10;
    // add time to page
    $("#timeDiv").removeClass("panel-danger").addClass("panel-primary").find("h3").text("Time Left").animate({opacity: '1'}, 500);
    $("#timeLeft").text(timeLeft).animate({opacity: '1'}, 500);
    // start timer
    setTimeout(startTimer, 500);
}

function startTimer() {
    counter = setInterval(timeDown, 1000);
}

function timeDown() {
    // reduce time left by one
    timeLeft--;
    // show the number of seconds left
    $("#timeLeft").text(timeLeft);
    // change panel color
    if (timeLeft === 5) {
        $("#timeDiv").removeClass("panel-primary").addClass("panel-danger");
    }
    // if time runs out, alert
    if (timeLeft === 0) {
        $("#timeDiv").find("h3").text("Time's Up!");
        $("#timeLeft").html("<i class='fa fa-hourglass-end' aria-hidden='true'></i>");
        setTimeout(function() {
            $("#timeDiv").find("h3").animate({opacity: '0'}, 500);
            $("#timeLeft").animate({opacity: '0'}, 500);
        }, 2500);
        timesUp();
        highlightCorrect();
        currentGame.unanswered++;
        progressBar("unanswered");
    }
}

$(".answer").click(function() {
    checkAnswer($(this));
});

function timesUp() {
    // clear counter interval
    clearInterval(counter);
    // disable hints
    $("#hintsBtn").addClass("disabled");
    // make answers unclickable
    $(".answer").css("pointer-events", "none");
}

function checkAnswer(answer) {
    // stop timer
    timesUp();
    // if answer is correct
    if (answer.hasClass("correct")) {
        highlightGuess();
        currentGame.correctGuesses++;
        progressBar("correct");
    } else {
        highlightWrong(answer);
        highlightCorrect();
        currentGame.wrongGuesses++;
        progressBar("wrong");
    }
}

function useHint() {
    var randomNumber = Math.floor(Math.random() * currentQuestion.wrongAnswers.length);
    // update one of the wrong div
    $(".wrong").each(function (i) {
        if (randomNumber === i) {
            highlightHint($(this));
            $(this).css("pointer-events", "none");
        }
    });
    // update number of hints
    currentGame.hints--;
    // update hints button
    $("#hintsLeft").text(currentGame.hints);
    $("#hintsBtn").addClass("disabled");
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

    // remove question object from questions array
    currentGame.questions.splice(currentGame.questions.indexOf(currentQuestion.index), 1);
    // if questions remain, start new question after 1 second
    if (currentGame.questions.length > 0) {
        setTimeout(function() {
            $(".answer").animate({opacity: '0'}, 500);
            $("#question").animate({opacity: '0'}, 500);
        }, 2500);
        setTimeout(function() {
            $(".answer").parent().removeClass("wrongAnswer", 100);
        }, 2900);
        setTimeout(newQuestion, 3000);
    }
    // if no more questions remain, run end game sequence
    if (currentGame.questions.length === 0) {
        timesUp();
        setTimeout(function() {
            $(".answer").parent().removeClass("wrongAnswer", 100);
            $("questionsDiv").fadeOut(1000);
            gameOver(currentGame);
        }, 1000);
    }
}

// game over function
function gameOver(game) {
    // fade out questions
    $("#questionsDiv").fadeOut(1000);
    $("#totalCorrect").text(currentGame.correctGuesses);
    $("#totalWrong").text(currentGame.wrongGuesses);
    $("#unanswered").text(currentGame.unanswered);
    // fade in stats
    setTimeout(function() {
        $("#statsTable").fadeIn(1000);
    }, 1000);
    $("#startGame").fadeIn(2000);
}

// highlight a wrong answer
function highlightHint(div) {
    div.parent().addClass("wrongAnswer", 100);
}

// highlight the correct answer
function highlightCorrect() {
    $(".correct").parent().addClass("correctAnswer", 100);
    setTimeout(function() {
        $(".correct").parent().removeClass("correctAnswer", 100);
    }, 2900);
}

// highlight the user's correct guess
function highlightGuess() {
    $(".correct").parent().addClass("correctGuess", 100);
    setTimeout(function() {
        $(".correct").parent().removeClass("correctGuess", 100);
    }, 2900);
}

// highlight the user's wrong guess
function highlightWrong(guess) {
    guess.parent().addClass("wrongGuess", 100);
    setTimeout(function() {
        guess.parent().removeClass("wrongGuess", 100);
    }, 2900);
}