// Global Variables
var SecondsLeft = 120; // Initial Time On Clock (In Seconds)
var IntervalTime = 1000; // Interval Time Set to 1 Second (In Milliseconds)
var Finish = false;
var ScoreList = [];

// DOM Element References
var StartQuiz = document.querySelector(".Start-Quiz-Button"); // Start Quiz Button
var MainPage = document.querySelector(".Main-Start-Page"); // Main (Start) Page
var QuestionPage = document.querySelector(".Questions-Page") // Questions Page
var QuestionTitle = document.querySelector(".Question"); // Question Title
var AnswerChoices = document.querySelector(".Answer-Choices"); // Question Choices
var AnswerIndicator = document.querySelector(".Answer-Response"); // Answer Indicator (Correct or Incorrect)
var FinishedQuizResults = document.querySelector(".Results-Finished"); // Quiz Results for Finished In Time
var FailedQuizResults = document.querySelector(".Results-Failed"); // Quiz Results for Time Ran Out
var QuizScoreFinished = document.querySelector(".Quiz-Score-Finished"); // Quiz Score Paragraph For Finished Quiz
var QuizScoreFailed = document.querySelector(".Quiz-Score-Failed"); // Quiz Score Paragraph For Failed Quiz
var Leaderboard = document.querySelector(".Leaderboard-Section"); // Leaderboard Container
var LeaderboardInitials = document.querySelector(".Leaderboard-Initials"); // Leaderboard Initials Input
var ClearScores = document.querySelector(".Clear-Scores-Button"); // Clear Leaderboard Scores Button
var ReturnToMainFinished = document.querySelector(".Return-Home-Button"); // Return to Main Page Button for Finished (In Time) Quiz
var ReturnToMainFailed = document.querySelector(".Return-Home-Button-2"); // Return to Main Page Button for Failed (Ran Out of Time) Quiz
var TimerVariable = document.querySelector(".Timer"); // Timer Variable
var UserScores = document.querySelector(".Submit-Score-Button");
var LeaderboardList = document.querySelector(".High-Scores");
var InitialsInput = document.querySelector("#Initials-Input");

// Questions, Choices, and Answers Array
var Questions = [
    {
        QuestionTitle: "Which of the following keywords is used to define a variable in JavaScript?",
        Choices: ['var','let','Both A and B','None of the above'],
        Answer: 'Both A and B',
    }, {
        QuestionTitle: "When an operator's value is NULL, the typeof returned by the unary operator is:",
        Choices: ['Boolean','Undefined','Object','Integer'],
        Answer: 'Object',
    }, {
        QuestionTitle: "Which of the following methods can be used to display data in some form using JavaScript?",
        Choices: ['document.write()','console.log()','window.alert()','All of the above'],
        Answer: 'All of the above',
    }, {
        QuestionTitle: "A very useful tool used during development and debugging for printing content to the debugger is:",
        Choices: ['JavaScript','Terminal/Bash','for loop','console.log'],
        Answer: 'console.log',
    }, {
        QuestionTitle: "Arrays in JavaScript can be used to store:",
        Choices: ['Numbers and Strings','Other Arrays','Booleans','All of the above'],
        Answer: 'All of the above',
    }, {
        QuestionTitle: "Commonly used data types DO NOT include:",
        Choices: ['Strings','Booleans','Alerts','Numbers'],
        Answer: 'Alerts',
    }, {
        QuestionTitle: "What is used to stop an interval timer in JavaScript?",
        Choices: ['clearInterval','clearTimer','intervalOver','None of the above'],
        Answer: 'clearInterval',
    }, {
        QuestionTitle: "How are objects compared when they are checked with the strict equality operator?",
        Choices: ['The contents of the objects are compared','Their references are compared','Both A and B','None of the above'],
        Answer: 'Their references are compared',
    }, {
        QuestionTitle: "Arrays in JavaScript are defined by which of the following statements?",
        Choices: ['It is an ordered list of objects','It is an ordered list of values','It is an ordered list of string','It is an ordered list of functions'],
        Answer: 'It is an ordered list of values',
    }, {
        QuestionTitle: "Which of the following can be used to call a JavaScript Code Snippet?",
        Choices: ['Function/Method','Preprocessor','Triggering Event','RMI'],
        Answer: 'Function/Method',
    },
];

// Function to Start/Stop, Countdown, and Display Timer
function StartTimer () {
    var TimerInterval = setInterval(function() {
        TimerVariable.style.display = "block";
        TimerVariable.textContent = SecondsLeft;
        if (SecondsLeft >= 0 && Finish) {
            clearInterval(TimerInterval);
            QuizFinish();
        } else if (SecondsLeft <= 0) {
            clearInterval(TimerInterval);
            QuizFail();
        } else {
            SecondsLeft--;
        }
    }, IntervalTime);
};

// Function to Start Quiz and Timer Countdown
StartQuiz.addEventListener("click", function() {
    MainPage.setAttribute("hidden", true);
    QuestionPage.style.display = "block";
    Leaderboard.style.display = "none";
    StartTimer();
    NextQuestion(0);
});

StartQuiz.addEventListener("mouseover", function(event) {
    event.target.style.backgroundColor = "pink";
});

StartQuiz.addEventListener("mouseleave", function(event) {
    event.target.style.backgroundColor = "white";
});

// Function to Display Next Question or End Quiz After Answering the Current Question
function NextQuestion(index) {
    while (AnswerChoices.firstChild) {
        AnswerChoices.removeChild(AnswerChoices.firstChild);
    }
    if (index === 10) {
        Finish = true;
    } else {
        QuestionTitle.textContent = Questions[index].QuestionTitle;
        QuestionTitle.setAttribute("style","text-align:center");
        for (var i=0; i<Questions[index].Choices.length; i++) {
            var li = document.createElement("li");
            li.textContent = Questions[index].Choices[i];
            li.setAttribute("type","button");
            li.setAttribute("style","text-align: center; background-color: pink; color: white; font-weight: bold; border-radius: 5px; padding: 5px; margin: 20px");
            li.addEventListener("mouseover", function(event) {
                event.target.style.backgroundColor = "black";
            });
            li.addEventListener("mouseleave", function(event) {
                event.target.style.backgroundColor = "pink";
            });
            if (Questions[index].Choices[i]===Questions[index].Answer) {
                li.addEventListener("click", function(event) {
                    AnswerIndicator.textContent += "✔";
                    CorrectAnswers++;
                    UserQuizScore = CalculateQuizScore();
                    NextQuestion(index+1);
                });
            } else {
                li.addEventListener("click", function(event) {
                    event.stopPropagation();
                    SecondsLeft -= 15;
                    AnswerIndicator.textContent += "𝑥";
                    CorrectAnswers;
                    UserQuizScore = CalculateQuizScore()
                    NextQuestion(index+1);
                });
            }
            AnswerChoices.appendChild(li);
        }
    }
};

// Function to Calculate Quiz Score
let CorrectAnswers = 0;
let UserQuizScore = 0;
function CalculateQuizScore() {
    return CorrectAnswers * 10;
};

// Function to Display Quiz Score (Finished Quiz)
function QuizFinish() {
    QuestionPage.setAttribute = ("hidden",true);
    QuestionTitle.style.display = "none";
    AnswerIndicator.style.display = "none";
    FinishedQuizResults.style.display = "block";
    UserQuizScore = CalculateQuizScore();
    QuizScoreFinished.textContent = "Quiz Score: " + UserQuizScore + "%";
    LeaderboardInitials.style.display = "block";
    console.log("Number of Correct Answers: ", CorrectAnswers);
    console.log("Quiz Score: ", UserQuizScore);
};

// Function to Display Quiz Score (Failed Quiz)
function QuizFail() {
    QuestionPage.setAttribute = ("hidden",true);
    QuestionTitle.style.display = "none";
    AnswerChoices.style.display = "none";
    AnswerIndicator.style.display = "none";
    FailedQuizResults.style.display = "block";
    UserQuizScore = CalculateQuizScore();
    QuizScoreFailed.textContent = "Quiz Score: " + UserQuizScore + "%";
    Leaderboard.style.display = "none";
    console.log("Number of Correct Answers: ", CorrectAnswers);
    console.log("Quiz Score: ", UserQuizScore);
};

// Function to Save Quiz Score
function SaveScore () {
    var UserScore = {
        Initials: InitialsInput.value.trim(),
        Score: UserQuizScore
    };
    ScoreList.push(UserScore);
    if (ScoreList.length > 1) {
        ScoreList.sort(function(a,b) {
            return b.Score - a.Score;
        });
    };
    if (ScoreList.length > 10) {
        ScoreList.pop();
    };
    localStorage.setItem("UserScore", JSON.stringify(ScoreList));
};

// Function to Display Leaderboard
function RenderScore() {
    var LeaderboardScore = JSON.parse(localStorage.getItem("UserScore"));
    while (LeaderboardList.firstChild) {
        LeaderboardList.removeChild(LeaderboardList.firstChild);
    };
    for (var i=0; i < ScoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = LeaderboardScore[i].Initials + ": " + LeaderboardScore[i].Score + "%";
        LeaderboardList.appendChild(li);
    }
};

// Function to Save Quiz Scores in Leaderboard to Local Storage
function Initiate() {
    var StoredScores = JSON.parse(localStorage.getItem("UserScore"));
    if (StoredScores !== null) {
        ScoreList = StoredScores;
    }
    RenderScore();
}

Initiate();

UserScores.addEventListener("click",function(event) {
    event.preventDefault();
    event.stopPropagation();
    UserScores.disabled = true;
    SaveScore();
    RenderScore();
});

UserScores.addEventListener("mouseover",function(event) {
    event.target.style.backgroundColor = "pink";
});

UserScores.addEventListener("mouseleave", function(event) {
    event.target.style.backgroundColor = "white";
});

// Function to Clear High Scores on Leaaderboard
ClearScores.addEventListener("click",function(event) {
    event.stopPropagation;
    localStorage.removeItem("UserScore");
    ScoreList = [];
    RenderScore();
});

ClearScores.addEventListener("mouseover",function(event) {
    event.target.style.backgroundColor = "pink";
});

ClearScores.addEventListener("mouseleave", function(event) {
    event.target.style.backgroundColor = "white";
});

// Function to Return To Main Page (Finished Quiz)
ReturnToMainFinished.addEventListener("click", ReturnToMain);
ReturnToMainFinished.addEventListener("mouseover",function(event) {
    event.target.style.backgroundColor = "pink";
});
ReturnToMainFinished.addEventListener("mouseleave", function(event) {
    event.target.style.backgroundColor = "white";
});

function ReturnToMain() {
    window.location.reload();
};

// Function to Return to Main Page (Failed Quiz)
ReturnToMainFailed.addEventListener("click", ReturnToMain);
ReturnToMainFailed.addEventListener("mouseover",function(event) {
    event.target.style.backgroundColor = "pink";
});
ReturnToMainFailed.addEventListener("mouseleave", function(event) {
    event.target.style.backgroundColor = "white";
});