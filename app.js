const quiz = [
    {
        question: "what is the most used programming language in 2024?",
        ans1text: "Java",
        ans2text: "C",
        ans3text: "Python",
        ans4text: "JavaScript",
        answer: "JavaScript",
    },
    {
        question: "Who is the President of US?",
        ans1text: "Joe Biden",
        ans2text: "Donald Trump",
        ans3text: "BAARACK Obama",
        ans4text: "Geroge Bush",
        answer: "Joe Biden",
    },
    {
        question: "What does HTML stand for?",
        ans1text: "Hypertext Markup Language",
        ans2text: "Cascading Style Sheet",
        ans3text: "Jason Object Notation",
        ans4text: "Helicopters Terminals Mototboats Lanborgingis",
        answer: "Hypertext Markup Language",
    },
    {
        question: "what year was JavaScript Lanched?",
        ans1text: "1996",
        ans2text: "1995",
        ans3text: "1994",
        ans4text: "none of the above",
        answer: "1995",
    },
];

const question = document.getElementById("quiz-question");
const option_a = document.getElementById("text_option_a");
const option_b = document.getElementById("text_option_b");
const option_c = document.getElementById("text_option_c");
const option_d = document.getElementById("text_option_d");
const submit = document.getElementById("Submit");
const timerElement = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timeLeft = 30; // Time limit for each question in seconds
let timer;

function loadQuestion() {
    question.textContent = quiz[currentQuestion].question;
    option_a.textContent = quiz[currentQuestion].ans1text;
    option_b.textContent = quiz[currentQuestion].ans2text;
    option_c.textContent = quiz[currentQuestion].ans3text;
    option_d.textContent = quiz[currentQuestion].ans4text;
    startTimer();
}

let startTime;

function startTimer() {
    timeLeft = 30;
    startTime = Date.now(); // Capture the start time
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
    sendTimeToServer(timeTaken); // Send the time taken to the server

    currentQuestion++;
    if (currentQuestion < quiz.length) {
        loadQuestion();
    } else {
        alert(`Your score is ${score} out of ${quiz.length}`);
        // Stop the quiz and display the final score
        question.textContent = "Quiz Completed!";
        option_a.textContent = "";
        option_b.textContent = "";
        option_c.textContent = "";
        option_d.textContent = "";
        submit.style.display = "none"; // Hide the submit button
        timerElement.textContent = ""; // Clear the timer
    }
}



function sendTimeToServer(timeTaken) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_time.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Time saved successfully");
        }
    };
    xhr.send(`timeTaken=${timeTaken}&question=${quiz[currentQuestion].question}`);
}


submit.addEventListener("click", () => {
    const checkedAns = document.querySelector('input[type="radio"]:checked');
    if (checkedAns === null) {
        alert("Please Select an answer");
    } else {
        clearInterval(timer);
        if (checkedAns.nextElementSibling.textContent === quiz[currentQuestion].answer) {
            score++;
        }
        nextQuestion();
    }
});

loadQuestion();
