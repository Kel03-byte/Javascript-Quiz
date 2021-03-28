var startCard = document.getElementById("card-1");  //Start section on page
var quizCard = document.getElementById("card-2");  //Quiz section on page
var detailsCard = document.getElementById("card-3"); //User input section
var highScoreCard = document.getElementById("card-4")  //Highscores section

var question = document.getElementById("question"); //Area on page to display the current question
var choiceA = document.getElementById("A");  //Area to display user's first choice
var choiceB = document.getElementById("B");  //Area to display user's second choice
var choiceC = document.getElementById("C");  //Area to display user's third choice
var choiceD = document.getElementById("D");  //Area to display user's fourth choice

var countDown = document.querySelector("#countdown"); // Count down timer

var startButton = document.getElementById("start-button");  //Button to start the quiz
var goBackButton = document.getElementById("go-back-button");  //Button to refresh back to the Start Page
var clearScores = document.getElementById("clear-scores-button");  //Button to clear the highscore list
var submitButton = document.getElementById("submit-button");  //Button for the user to submit their initials and score
var veiwHighscore = document.getElementById("view-highscore"); //link to veiw the high scores

var currentQuestion = 0; //Sets the current question to 0
var totalSeconds = 75; //Sets the count down to 75 seconds
var timeRemaining = totalSeconds; //Adjusts the countdown to account for wrong answers
var secondsElapsed = 0; //
var discountSeconds = 0;
var time = setInterval(startTimer, 1000);

var initials = document.getElementById("initials");
var highScoresList = document.getElementById("highscores-list");
var localHighscoresArray = [];

startButton.addEventListener("click", startQuiz)
submitButton.addEventListener("click", displayHighscore)
goBackButton.addEventListener("click", goBackToStartPage)
clearScores.addEventListener("click", clearHighscores)
veiwHighscore.addEventListener("click", displayHighscore)

clearInterval(time);
countDown.innerHTML = "Timer: 0"

//The Questions
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choiceA: "1. strings",
        choiceB: "2. booleans",
        choiceC: "3. alerts",
        choiceD: "4. numbers",
        correct: "C"
    }, {
        question: "The condition in an if/else statement is enclosed within ____.",
        choiceA: "1. parentheses",
        choiceB: "2. curly brackets",
        choiceC: "3. quotes",
        choiceD: "4. square brackets",
        correct: "A"
    }, {
        question: "Arrays in Javascript can be used to store ____.",
        choiceA: "1. numbers and strings",
        choiceB: "2. other arrays",
        choiceC: "3. booleans",
        choiceD: "4. all of the above",
        correct: "D"
    }, {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choiceA: "1. commas",
        choiceB: "2. quotes",
        choiceC: "3. curly brackets",
        choiceD: "4. parentheses",
        correct: "B"
    }, {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceA: "1. Javascript",
        choiceB: "2. terminal / bash",
        choiceC: "3. for loops",
        choiceD: "4. console.log",
        correct: "D"
    }
];

// Starts the quiz
function startQuiz() {
    quizCard.style.display = "block",
        startCard.style.display = "none",
        detailsCard.style.display = "none",
        highScoreCard.style.display = "none",
        time = setInterval(startTimer, 1000);
    startTimer()
    renderQuestion()
}

//Starts the timer
function startTimer() {
    timeRemaining = totalSeconds - secondsElapsed - 1 - discountSeconds;
    countDown.textContent = timeRemaining;
    secondsElapsed++;
    countDown.innerHTML = "Timer: " + timeRemaining;
    if (timeRemaining <= 0) {
        clearInterval(time);
        endQuiz("timesUp");
    }
}

//Gets the questions fron the array one at a time and displays them
function renderQuestion() {
    var q = questions[currentQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

//checks if the user input is correct. If so then a message on the page appears saying "Correct", if not then
//the message on the page is "Wrong" and 10 seconds is deducted from the timer
function checkAnswer(answer) {
    var lastQuestion = questions.length - 1;

    if (answer == questions[currentQuestion].correct) {
        document.getElementById("answer-message").innerHTML = "Correct!"
        document.getElementById("answer-message").style.borderTop = "solid"
    }

    else {
        document.getElementById("answer-message").innerHTML = "Wrong!"
        document.getElementById("answer-message").style.borderTop = "solid"
        discountSeconds += 10;
        clearInterval(time);
        time = setInterval(startTimer, 1000);
    }

    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        renderQuestion()

    } else {
        endQuiz("noMoreQuestions")
    }
}

//This function displays the input page for the user at the end of the quiz and the final score
function endQuiz(cause) {
    if (cause === "noMoreQuestions") {
        clearInterval(time);
        displayDetailsCard()

    } else if (cause === "timesUp") {
        clearInterval(time);
        quizCard.style.display = "none";
        startCard.style.display = "block";
        detailsCard.style.display = "none";
        highScoreCard.style.display = "none";
        startCard.innerHTML = "Sorry! Time's up";
    }
}
//This function displays the Highscore Page
function displayHighscore(event) {
    event.preventDefault()
    document.getElementById("header").style.display = "none"
    detailsCard.style.display = "none"
    highScoreCard.style.display = "block";
    startCard.style.display = "none",
        addHighscoresToLocalStorage()
}

//creates a list for the highscores and adds it to local storage
function addHighscoresToLocalStorage() {
    var highScoreElement = document.createElement("li");
    var highscoreString = initials.value + " - " + timeRemaining;
    var storedHighscore = localStorage.getItem("highscore");
    storedHighscore = storedHighscore ? storedHighscore.split(',') : [];
    storedHighscore.push(highscoreString)
    localStorage.setItem("highscore", storedHighscore.toString());
    highScoreElement.textContent = highscoreString;
    highScoresList.append(highScoreElement);
    initials.value = "";
}

//This function displays the final score and allows the user to input their initials to save the score to "local storage"
function displayDetailsCard() {
    document.getElementById("finalscore").innerHTML = "Your score is " + timeRemaining;
    detailsCard.style.display = "block";
    quizCard.style.display = "none";
}

//This function clears the highscore list
function clearHighscores() {
    localHighscoresArray = [];
    localStorage.setItem("highscore", localHighscoresArray);
    highScoresList.innerHTML = (" ");
}

//This function reloads the web page to the begining
function goBackToStartPage() {
    location.reload();
}