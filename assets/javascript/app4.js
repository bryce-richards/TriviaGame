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
        "4",
        "6"
    ]
}, {
    question: "What year was 'Fellowship of the Ring' film released?",
    correctAnswer: "2001",
    wrongAnswers: [
        "2004",
        "2003",
        "1999"
    ]
}, {
    question: "Which character's Motto is 'Do Not Be Hasty?'",
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
    console.log(this);
    console.log(this.index);
    this.question = this.index.question;
    this.correctAnswer = this.index.correctAnswer;
    this.wrongAnswers = this.index.wrongAnswers;
}

function startGame() {
    // get array by theme
    currentGame = new Game("lotr");
    // disable start game button
    $("#startGame").addClass("disabled");
    // fade out opening screen
    $("#openingPage").fadeOut(1000);
    // create new Game object by theme
    currentGame = new Game("lotr");
    setTimeout(newQuestion, 1000);
    $("main").fadeIn(1000);
    $("#statsTable").hide();
}

function newQuestion() {
    // create the question object and then assign to currentQuestion
    currentQuestion = new Question(currentGame.questions);
    // make answers clickable
    $(".answer").each(function (i) {
        $(this).parent().removeClass("wrongAnswer", 500);
        $(this).removeClass("correct").addClass("wrong").css("pointer-events", "auto");
    });
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
    $(".wrong").each(function (i) {
        $(this).text(currentQuestion.wrongAnswers[i]);
    });
    // enable hints button
    if (currentGame.hints > 0) {
        $("#hintsBtn").removeClass("disabled");
    }
    // set time left
    timeLeft = 15;
    // add time to page
    $("#timeLeft").text(timeLeft);
    // start timer
    setTimeout(startTimer, 1000);


}

function startTimer() {
    $("#timeDiv").removeClass("panel-danger").addClass("panel-primary");
    counter = setInterval(timeDown, 1000);
}

function timeDown() {
    // reduce time left by one
    timeLeft--;
    // show the number of seconds left
    $("#timeLeft").text(timeLeft);
    // update HTML
    if (timeLeft === 5) {
        $("#timeDiv").removeClass("panel-primary").addClass("panel-danger");
    }
    if (timeLeft === 0) {
        timesUp();
        highlightCorrect();
        currentGame.unanswered++;
        progressBar("unanswered");
    }
}

$(".answer").click(function () {
    userGuess = $(this)
    checkAnswer(userGuess);
});

function timesUp() {
    // clear counter interval
    clearInterval(counter);
    // make answers unclickable
    $(".answer").each(function (i) {
        $(this).css("pointer-events", "none");
    });
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
            $("#question").animate({opacity: '0'}, 500);
        }, 1000);
        setTimeout(newQuestion, 2000);
    }
    // if no more questions remain, run end game sequence
    if (currentGame.questions.length === 0) {
        setTimeout(function () {
            $("questionsDiv").fadeOut(1000);
            gameOver(currentGame)
        }, 2000);
    }
}

function gameOver(game) {
    $("#questionsDiv").hide()
    $("#totalCorrect").text(currentGame.correctGuesses);
    $("#totalWrong").text(currentGame.wrongGuesses);
    $("#unanswered").text(currentGame.unanswered);
    $("#statsTable").fadeIn(1000);
    setTimeout(function () {
        $("#startGame").removeClass("disabled");
    }, 1000);
}

// highlight a wrong answer
function highlightHint(div) {
    div.parent().addClass("wrongAnswer", 500);
}

// highlight the correct answer
function highlightCorrect() {
    $(".correct").parent().addClass("correctAnswer", 500);
    setTimeout(function() {
        $(".correct").parent().removeClass("correctAnswer", 500);
    }, 2000);
}

// highlight the user's correct guess
function highlightGuess() {
    $(".correct").parent().addClass("correctGuess", 100);
    setTimeout(function() {
        $(".correct").parent().removeClass("correctGuess", 100);
    }, 2000);
}

// highlight the user's wrong guess
function highlightWrong(guess) {
    guess.parent().addClass("wrongGuess", 100);
    setTimeout(function() {
        guess.parent().removeClass("wrongGuess", 100);
    }, 2000);
}