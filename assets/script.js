// Initial values // variables to keep track of quiz state
var time = questions.length *15;
var currentQuestion = 0;
var timer;

var questions = document.getElementById("questions");
var timer = document.getElementById("time");
var answers = document.getElementById("answers");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var testTaker = document.getElementById("testTaker");

// hide the start screen

// If the timer is over, then go to the next question
function nextQuestion() {
    var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        // TODO
        console.log("Game Over");
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
    
}

// Start a 45 seconds timer for user to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);

    
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices to the browser
function loadQuestion() {
    counter = 45;
    timer = setInterval(countDown, 1000);

    var question = quizQuestions[currentQuestion].question; // 
    var choices = quizQuestions[currentQuestion].choices; // 

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    var result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// Either correct/wrong choice selected, go to the next question
// Event Delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Winsss!!!!');
        
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('Lost!!!!');
        
        setTimeout(nextQuestion, 3 * 1000);
    }
});


function displayResult() {
    var result = `
        <p>You get ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length} questions(s) right</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});


function loadRemainingQuestion() {
    var remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    var totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}



$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});