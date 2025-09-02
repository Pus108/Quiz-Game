const quizData = {
    easy: [
        { type: "single", 
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: 2
        },
        { type: "multiple", 
            question: "Which of these are fruits?", 
            options: ["Apple", "Carrot", "Banana", "Potato"], 
            answer: [0, 2] 
        },
        { type: "fill", 
            question: "The sun rises in the ____.",
            answer: "east"
         },
        { type: "single",
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"], 
            answer: 2 
        },
        { type: "multiple",
            question: "Which are colors of the Indian flag?",
            options: ["Red", "White", "Green", "Orange"], 
            answer: [1, 2, 3] 
        },
        { type: "fill", 
            question: "____ is known as the 'King of Fruits'.", 
            answer: "mango" 
        },
        { type: "single",
            question: "Which gas do plants produce during photosynthesis?", 
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], 
            answer: 0 
        }
    ],
    medium: [
        { type: "single", 
            question: "Which planet is known as the Red Planet?", 
            options: ["Earth", "Mars", "Jupiter", "Venus"], 
            answer: 1 
        },
        { type: "multiple", 
            question: "Select prime numbers:", 
            options: ["2", "4", "7", "9"], 
            answer: [0, 2] 
        },
        { type: "fill", 
            question: "The largest ocean on Earth is the ____ Ocean.", 
            answer: "pacific" 
        },
        { type: "single", 
            question: "What is H2O commonly known as?", 
            options: ["Salt", "Water", "Hydrogen", "Oxygen"], 
            answer: 1 
        },
        { type: "multiple", 
            question: "Which are mammals?", 
            options: ["Whale", "Shark", "Elephant", "Crocodile"], 
            answer: [0, 2] 
        },
        { type: "fill", 
            question: "The fastest land animal is the ____.", 
            answer: "cheetah" 
        },
        { type: "single", 
            question: "Which metal is liquid at room temperature?", 
            options: ["Mercury", "Iron", "Gold", "Silver"], 
            answer: 0 
        }
    ],
    hard: [
        { type: "single", 
            question: "Who developed the Theory of Relativity?", 
            options: ["Newton", "Einstein", "Tesla", "Edison"], 
            answer: 1 
        },
        { type: "multiple", 
            question: "Which are programming languages?", 
            options: ["Python", "HTML", "C++", "CSS"], 
            answer: [0, 2] 
        },
        { type: "fill", 
            question: "The square root of 144 is ____.", 
            answer: "12" 
        },
        { type: "single", 
            question: "Which element has the chemical symbol 'Au'?", 
            options: ["Silver", "Gold", "Aluminium", "Argon"], 
            answer: 1 },
        { type: "multiple", 
            question: "Which countries are in Europe?", 
            options: ["Brazil", "Germany", "Italy", "Canada"], 
            answer: [1, 2] 
        },
        { type: "fill", 
            question: "The currency of Japan is the ____.", 
            answer: "yen" 
        },
        { type: "single", 
            question: "Which scientist proposed the three laws of motion?", 
            options: ["Einstein", "Newton", "Galileo", "Darwin"], 
            answer: 1 
        }
    ]
};
let current = 0;
let score = 0;
let selectedLevel = "";
let currentQuiz = [];

const titleEl = document.getElementById("title");
const levelSelect = document.getElementById("levelSelect");
const quizArea = document.getElementById("quizArea");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");
function startQuiz(level) {
    selectedLevel = level;
    currentQuiz = quizData[level];
    current = 0;
    score = 0;

    titleEl.innerText = `${level.toUpperCase()} Level Quiz`;
    levelSelect.style.display = "none";
    quizArea.style.display = "block";

    loadQuestion();
}
function loadQuestion() {
    optionsEl.innerHTML = "";
    resultEl.innerHTML = "";
    progressEl.innerText = `Question ${current + 1} of ${currentQuiz.length}`;
    let q = currentQuiz[current];
    questionEl.innerText = q.question;

    if (q.type === "single") {
        q.options.forEach((opt, i) => {
            optionsEl.innerHTML += `
            <label>
             <input type="radio" name="option" value="${i}">
             ${opt}
            </label>`;
        });
    }
    else if (q.type === "multiple") {
        q.options.forEach((opt, i) => {
            optionsEl.innerHTML += `
            <label>
              <input type="checkbox" name="option" value="${i}">
              ${opt}
            </label>`;
        });
    }
    else if (q.type === "fill") {
        optionsEl.innerHTML = `
          <input type="text" id="fillInput" placeholder="Type your answer here">`;
    }
}
function checkAnswer() {
    let q = currentQuiz[current];
    let isCorrect = false;

    if (q.type === "single") {
        let selected = document.querySelector("input[name='option']:checked");
        if (selected && parseInt(selected.value) === q.answer) {
            isCorrect = true;
        }
    }
    else if (q.type === "multiple") {
        let selected = [...document.querySelectorAll("input[name='option']:checked")]
                      .map(el => parseInt(el.value));
        selected.sort();
        if (JSON.stringify(selected) === JSON.stringify(q.answer)) {
            isCorrect = true;
        }
    }
    else if (q.type === "fill") {
        let ans = document.getElementById("fillInput").value.trim().toLowerCase();
        if (ans === q.answer) {
            isCorrect = true;
        }
    }

    if (isCorrect) score++;
}
nextBtn.addEventListener("click", () => {
    checkAnswer();
    current++;
    if (current < currentQuiz.length) {
        loadQuestion();
    } else {
        quizArea.innerHTML = `
        <h2>🎉 Quiz Completed!</h2>
        <p class="result">🏆 Your Score in ${selectedLevel.toUpperCase()} Level: ${score}/${currentQuiz.length}</p>
        <button onclick="location.reload()">Play Again</button>`;
    }
});

