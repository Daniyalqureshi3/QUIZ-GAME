// dom
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("result-btn");
const progressBar = document.getElementById("progress");
const percentageElement = document.getElementById("percentage");
// quiz question
const quizQuestion =[
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer:[
            {text: "<js>", correct: false},
            {text: "<scription>", correct: false},
            {text: "<javascript>", correct: false},
            {text: "<script>", correct: true},
        ],
    },
    {
        question: "How do you write `Hello world`  in an alert box?",
         answer:[
            {text: "msg(`hello world`)", correct: false},
            {text: "alert(`hello world`)", correct: true},
            {text: "msgBox(`hello world`)", correct: false},
            {text: "alertBox(`hello world`)", correct: false},
        ],
    },
    {
        question: "How do you create a function in JavaScript?",
        answer:[
            {text:"function = myfunction()", correct: false},
            {text: "function myfunction()", correct: true},
            {text: "function:myfunction()", correct: false},
            {text: "function = function()", correct: false},
        ],
    },
    {
        question: "How do you call a function named `myFunction`?",
        answer:[
            {text:"call myFunction()", correct: false},
            {text: "call function myFunction()", correct: false},
            {text: "call Function()", correct: true},
            {text: "myFunction()", correct: false},
        ],
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answer:[
            {text:"if i == 5 then", correct: false},
            {text: "if i = 5 then", correct: false},
            {text: "if (i == 5)", correct: true},
            {text: "if i = 5", correct: false},
        ],
    },
    {
        question: "How does a WHILE loop start?",
        answer:[
            {text:"While (i = 10)", correct: false},
            {text: "While i = 1 to 10", correct: false},
            {text: "While (i <= 10: i++)", correct: false},
            {text: "while (i <= 10)", correct: true},
        ],
    },
    {
        question: "How does a FOR loop start?",
        answer:[
            {text:"for(i =0; i<=5; i++) ", correct: true},
            {text: "for(i =0; i<=5;)", correct: false},
            {text: "for( i<=5; i++)", correct: false},
            {text: "for i = 1 to 5", correct: false},
        ],
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answer:[
            {text:"this is a comment ", correct: false},
            {text: "comment!!", correct: false},
            {text: "<!--this is a comment -->", correct: false},
            {text: "// this is a comment", correct: true},
        ],
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        answer:[
            {text:"round(7.25)", correct: false},
            {text: "rnd(7.25)", correct: false},
            {text: "Math.round(7.25)", correct: true},
            {text: "math.rnd(7.25)", correct: false},
        ],
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answer:[
            {text:"Math.ceil(x.y)", correct: true},
            {text: "ceil(x.y)", correct: false},
            {text: "Math.max(x.y)", correct: false},
            {text: "Math.ceil(y)", correct: false},
        ],
    },

];
//  quiz state
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestion.length;
maxScoreSpan.textContent = quizQuestion.length;
// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent=0;
    
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showquestion();
}

function showquestion() {
    answerDisabled = false
    const currentQuestion = quizQuestion[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestion.length) * 100}%`;
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.answer.forEach((answer)=>{
        const button = document.createElement("button"); 
        button.textContent = answer.text;   
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct.toString();
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button); 
    })
}
function selectAnswer(event) {

    if (answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button)=>{

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        else if(button === selectedButton){
            button.classList.add("incorrect");
        }

    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(()=>{

        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestion.length) {
            showquestion();
        } 
        else{
            showResult();
        }

    },1000)
}
function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestion.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! Excellent work!😍😍";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job!👌😎";
    } else if (percentage >= 60) {
        resultMessage.textContent = " good effort!😉😉";
    } else if (percentage >= 40){
        resultMessage.textContent = "not bad, keep practicing!😒😒";
    }else {
        resultMessage.textContent = "Better luck next time!😢😢";
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
    
}
let leftime = 80;
const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");
const retryBtn = document.getElementById("retry-btn");

const downloadtime = setInterval(function(){

    countdownElement.textContent = leftime;

    if (leftime <= 0) {
        clearInterval(downloadtime);

        messageElement.textContent = "Time's up! Please try again.";
        countdownElement.textContent = 0;

        const answerButtons = document.querySelectorAll(".answer-btn");
        answerButtons.forEach(button => button.disabled = true);

        retryBtn.style.display = "block";
    }

    leftime--;

},1000);
retryBtn.addEventListener("click", function(){
    location.reload();
});
// /////
const finalScoreElement = document.getElementById("final-score");
const scores = parseInt(finalScoreElement.textContent);
finalScoreElement.classList.remove("scores-low","scores-medium","scores-high");

if(scores <= 4){
    finalScoreElement.classList.add("scores-low");
}
else if(scores <= 7){
    finalScoreElement.classList.add("scores-medium");
}
else{
    finalScoreElement.classList.add("scores-high");game-2
}
// code end here😎🥲 //
