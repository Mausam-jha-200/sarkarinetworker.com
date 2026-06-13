
    // =========================
// SARKARI NETWORKER CBT ENGINE
// =========================

const questionCards =
document.querySelectorAll(".question-card");

const paletteBtns =
document.querySelectorAll(".palette-btn");

const options =
document.querySelectorAll(".option");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

const reviewBtn =
document.getElementById("reviewBtn");

const clearBtn =
document.getElementById("clearBtn");

const darkBtn =
document.getElementById("darkBtn");

const submitBtn =
document.getElementById("submitBtn");

const timer =
document.getElementById("timer");

const progressCounter =
document.getElementById("progressCounter");

const progressFill =
document.getElementById("progressFill");

const attemptedText =
document.getElementById("attemptedText");

const resultModal =
document.getElementById("resultModal");

const scoreText =
document.getElementById("scoreText");

const correctText =
document.getElementById("correctText");

const wrongText =
document.getElementById("wrongText");

const accuracyText =
document.getElementById("accuracyText");

// =========================
// ANSWERS
// =========================

const correctAnswers = [
1, // Delhi
1, // 26 Jan 1950
1, // Gandhi
1, // Tiger
2, // India
2, // Rupee
1, // Tagore
1, // Nehru
0, // Peacock
2  // Rajasthan
];

let currentQuestion = 0;

let answers =
JSON.parse(
localStorage.getItem(
"sscAnswers"
)
) || {};

let reviewQuestions =
JSON.parse(
localStorage.getItem(
"sscReview"
)
) || [];

// =========================
// SHOW QUESTION
// =========================

function showQuestion(index){

questionCards.forEach(card=>{

card.classList.remove("active");

});

questionCards[index]
.classList.add("active");

paletteBtns.forEach(btn=>{

btn.classList.remove(
"current"
);

});

paletteBtns[index]
.classList.add(
"current"
);

currentQuestion=index;

}

showQuestion(0);

// =========================
// OPTION SELECT
// =========================

questionCards.forEach(
(card,qIndex)=>{

const cardOptions =
card.querySelectorAll(
".option"
);

cardOptions.forEach(
(option,optIndex)=>{

option.addEventListener(
"click",
()=>{

cardOptions.forEach(
opt=>{

opt.classList.remove(
"selected"
);

});

option.classList.add(
"selected"
);

answers[qIndex] =
optIndex;

paletteBtns[qIndex]
.classList.add(
"answered"
);

localStorage.setItem(
"sscAnswers",
JSON.stringify(
answers
)
);

updateProgress();

});

});

});

// =========================
// LOAD SAVED ANSWERS
// =========================

function loadAnswers(){

Object.keys(
answers
).forEach(index=>{

const card =
questionCards[index];

if(!card) return;

const opts =
card.querySelectorAll(
".option"
);

opts[
answers[index]
]?.classList.add(
"selected"
);

paletteBtns[index]
.classList.add(
"answered"
);

});

}

loadAnswers();

// =========================
// NEXT
// =========================

nextBtn.addEventListener(
"click",
()=>{

if(
currentQuestion <
questionCards.length-1
){

showQuestion(
currentQuestion+1
);

}

});

// =========================
// PREVIOUS
// =========================

prevBtn.addEventListener(
"click",
()=>{

if(
currentQuestion > 0
){

showQuestion(
currentQuestion-1
);

}

});

// =========================
// PALETTE
// =========================

paletteBtns.forEach(
(btn,index)=>{

btn.addEventListener(
"click",
()=>{

showQuestion(index);

});

});

// =========================
// REVIEW
// =========================

reviewBtn.addEventListener(
"click",
()=>{

if(
!reviewQuestions.includes(
currentQuestion
)
){

reviewQuestions.push(
currentQuestion
);

paletteBtns[
currentQuestion
].classList.add(
"review"
);

localStorage.setItem(
"sscReview",
JSON.stringify(
reviewQuestions
)
);

}

});

// =========================
// LOAD REVIEW
// =========================

reviewQuestions.forEach(
(index)=>{

paletteBtns[index]
.classList.add(
"review"
);

});

// =========================
// CLEAR
// =========================

clearBtn.addEventListener(
"click",
()=>{

delete answers[
currentQuestion
];

const opts =
questionCards[
currentQuestion
].querySelectorAll(
".option"
);

opts.forEach(opt=>{

opt.classList.remove(
"selected"
);

});

paletteBtns[
currentQuestion
].classList.remove(
"answered"
);

localStorage.setItem(
"sscAnswers",
JSON.stringify(
answers
)
);

updateProgress();

});

// =========================
// PROGRESS
// =========================

function updateProgress(){

const attempted =
Object.keys(
answers
).length;

const total =
questionCards.length;

progressCounter.innerHTML =
`${attempted}/${total}`;

attemptedText.innerHTML =
`${attempted} Questions Attempted`;

progressFill.style.width =
`${(attempted/total)*100}%`;

}

updateProgress();

// =========================
// DARK MODE
// =========================

darkBtn.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"dark-mode"
);

});

// =========================
// TIMER
// =========================

let totalSeconds =
7200;

const savedTime =
localStorage.getItem(
"sscTime"
);

if(savedTime){

totalSeconds =
parseInt(savedTime);

}

setInterval(()=>{

let hrs =
Math.floor(
totalSeconds/3600
);

let mins =
Math.floor(
(totalSeconds%3600)/60
);

let secs =
totalSeconds%60;

timer.innerHTML =

`${String(hrs)
.padStart(2,"0")}
:
${String(mins)
.padStart(2,"0")}
:
${String(secs)
.padStart(2,"0")}`;

localStorage.setItem(
"sscTime",
totalSeconds
);

if(totalSeconds<=0){

submitExam();

}

totalSeconds--;

},1000);

// =========================
// SUBMIT EXAM
// =========================

submitBtn.addEventListener(
"click",
()=>{

if(
confirm(
"Submit Exam?"
)
){

submitExam();

}

});

// =========================
// RESULT
// =========================

function submitExam(){

let correct = 0;

let wrong = 0;

Object.keys(
answers
).forEach(index=>{

if(
answers[index] ==
correctAnswers[index]
){

correct++;

}
else{

wrong++;

}

});

const score =
(correct*2)
-
(wrong*0.50);

const accuracy =
(
(correct/
(correct+wrong || 1)
)*100
).toFixed(2);

scoreText.innerHTML =
score;

correctText.innerHTML =
`Correct : ${correct}`;

wrongText.innerHTML =
`Wrong : ${wrong}`;

accuracyText.innerHTML =
`Accuracy : ${accuracy}%`;

resultModal.style.display =
"flex";

localStorage.removeItem(
"sscAnswers"
);

localStorage.removeItem(
"sscReview"
);

localStorage.removeItem(
"sscTime"
);

}



// =========================
// FULL SCREEN
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

document.documentElement
.requestFullscreen?.();

});

// =========================
// TAB CHANGE WARNING
// =========================

document.addEventListener(
"visibilitychange",
()=>{

if(
document.hidden
){

alert(
"Warning: Tab Switching Detected!"
);

}

});
