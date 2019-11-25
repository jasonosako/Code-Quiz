var questionIndex = 0;
var time = 60;
var timer;

var timeRemaining = document.getElementById("time");

timeRemaining.textContent = time;

function startButton() {
timer = setInterval(countDown, 1000);
document.getElementsByClassName("starting-screen")[0].style.visibility = 'hidden';
//$(".starting-screen").style.visibility = 'hidden';
document.getElementById("questions").style.visibility = "visible";

//$(".starting-screen").hide();
//$("#questions").show();
showQuestions();
}

function showQuestions() {
    document.getElementById("#questions")
        $("#questions-title").text(quizQuestions[questionIndex].title);
    document.getElementById("question-choices")
        //$("#choices").text(quizQuestions[questionIndex].choices);
    for(var i = 0; i < quizQuestions[questionIndex].choices.length; i++) {
        var myChoices = document.createElement("button");
        //myChoices.setAttribute("value", "");
        myChoices.setAttribute("class", "btn btn-secondary");
        //console.log(quizQuestions[questionIndex].choices[0]);
        myChoices.innerHTML = quizQuestions[questionIndex].choices[i];
        
        document.getElementById("question-choices").addEventListener("click", clickAnswer);
        //console.log(document.getElementById("choices"));
        document.getElementById("question-choices").appendChild(myChoices);
          
    }
}

function clickAnswer(value) {
    let realValue = value.path[0].innerText;
    console.log(realValue);
    if(questionIndex == quizQuestions.length-1) {
        quizComplete(time);
        return;
    }
    if (realValue !== quizQuestions[questionIndex].answer) {
    
            time -= 10;
        if (time < 0) {
            time = 0;   
        }
        nextQuestion(); 
    }else{
        nextQuestion();
    }
        timeRemaining.textContent = time;
}

function countDown() {
    // update time
    time--;
    timeRemaining.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
    quizComplete();
    }

}
function quizComplete(theTime) {
   $('.card').show();
   $("#questions-title").text("");
   document.getElementById("question-choices").innerHTML = "";

    var scores = JSON.parse(window.localStorage.getItem("scores")) || [];

    //var lastScore = str.lastIndexOf("scores");

    console.log($('.card-text'));
    console.log(scores);
    $('.card-title')[0].textContent = time;
    


        var newScore = {
            score: theTime,
          };
      
          // save to localstorage
        scores.push(newScore);
        window.localStorage.setItem("scores", JSON.stringify(scores));
    

    timeRemaining = null;
    timer = null;
}
function nextQuestion(){
    $("#question-choices")[0].innerHTML = '';
    questionIndex++;
    showQuestions();
}

function reload(){
    window.reload;
}




