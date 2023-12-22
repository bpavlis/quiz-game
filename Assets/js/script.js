var questions = [
    {
        question: "Are the Bears the best team ever?",
        answers: [
            { text: "Yes, boo Packers!", correct: true },
            { text: "No they aren't!", correct: false },
        ]
    },
    {
        question: "Are the Packers the worst team ever?",
        answers: [
            { text: "Yes, boo Packers!", correct: true },
            { text: "Nope, they're the best!", correct: false },
        ]
    },
    {
        question: "What year did the Bears win the superbowl?",
        answers: [
            { text: "1984-85 season", correct: false },
            { text: "1985-86 season", correct: true },
        ]
    },
    {
        question: "Who is the Bears all time leading scorer?",
        answers: [
            { text: "Walter Payton", correct: false },
            { text: "Robbie Gould", correct: true },
        ]
    },
    {
        question: "How many career rushing yards does Walter Payton have?",
        answers: [
            { text: "16,726", correct: true },
            { text: "16,525", correct: false },
        ]
    },
];

var timeLeft = 100;
var timer;
var timerSelect = document.getElementById("timer");

var startBtn = document.getElementById("start-btn");
var continueBtn = document.getElementById("continue-btn");

var qContainer = document.getElementById("question-container");
var startSection = document.getElementById("start-section");


var questionItsel = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var shuffledQuestions, currentQuestionIndex;


startBtn.addEventListener("click", startGame);
continueBtn.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});


function timeTick() {
    timeLeft--;
    timerSelect.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}


function startGame() {
    timer = setInterval(timeTick, 1000);
    startSection.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    qContainer.classList.remove("hide");
    timeTick();
    setNextQuestion();
};


function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};


function showQuestion(question) {
    questionItsel.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};


function resetState() {
    continueBtn.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};


function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    if (correct) {
        checkAnswerEl.innerHTML = "You got it right!";
    } else {
        checkAnswerEl.innerHTML = "Sorry that was not the correct answer.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        continueBtn.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startBtn.classList.remove("hide")
        saveScore();
    }
};


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};


function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};


function saveScore() {
    clearInterval(timer);
    timerSelect.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        qContainer.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};


var loadScores = function () {
    if (!savedScores) {
        return false;
    }
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};


function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startSection.classList.add("hide");
    qContainer.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

restartButton.addEventListener("click", function () {
    window.location.reload();
});

clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});