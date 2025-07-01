const choices = ["stone", "paper", "scissors"];
let humanScore = 0;
let robotScore = 0;
let life = 5;

const lifeSpan = document.querySelector('.life span');
const humanScoreSpan = document.querySelectorAll('.score_container .human span')[0];
const resultText = document.getElementById('resultText');
const robotScoreSpan = document.querySelectorAll('.score_container .human span')[2];
const buttons = document.querySelectorAll('.random_container button');
const humanImg = document.getElementById('humanImg');
const robotImg = document.getElementById('robotImg');

const imgMap = {
    stone: "./Assest/stone_new.jpg",
    paper: "./Assest/paper_new.jpg",
    scissors: "./Assest/scissors_new.jpg"
};

function getRobotChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function decideWinner(human, robot) {
    if (human === robot) return 'draw';
    if (
        (human === 'stone' && robot === 'scissors') ||
        (human === 'paper' && robot === 'stone') ||
        (human === 'scissors' && robot === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

function updateUI(result) {
    lifeSpan.textContent = life;
    humanScoreSpan.textContent = humanScore;
    robotScoreSpan.textContent = robotScore;
    if (result === 'win') {
        resultText.textContent = 'YOU WIN!';
    } else if (result === 'lose') {
        resultText.textContent = 'YOU LOSE!';
    } else if (result === 'draw') {
        resultText.textContent = 'DRAW!';
    } else {
        resultText.textContent = '-';
    }
}

function showGameOverPrompt() {
    let winnerText = '';
    if (humanScore > robotScore) {
        winnerText = "🎉 HUMAN WINS! 🎉";
    } else if (robotScore > humanScore) {
        winnerText = "🤖 ROBOT WINS! 🤖";
    } else {
        winnerText = "🤝 IT'S A DRAW! 🤝";
    }

    const overlay = document.createElement('div');
    overlay.className = 'gameover-overlay';

    const box = document.createElement('div');
    box.className = 'gameover-box';
    box.innerHTML = `<div class="gameover-title">GAME OVER</div>
        <div class="gameover-winner">${winnerText}</div>
        <div class="gameover-score">Final Score<br>Human: ${humanScore} &nbsp;|&nbsp; Robot: ${robotScore}</div>
        <button id="restartBtn" class="gameover-restart">Restart</button>`;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('restartBtn').onclick = () => {
        document.body.removeChild(overlay);
        humanScore = 0;
        robotScore = 0;
        life = 5;
        buttons.forEach(btn => btn.disabled = false);
        if (humanImg) humanImg.src = "./Assest/Hiden - Anime boy.jpg";
        if (robotImg) robotImg.src = "./Assest/robot.jpg";
        updateUI();
        resultText.textContent = '-';
    };
}

function endGame() {
    resultText.textContent = 'GAME OVER!';
    buttons.forEach(btn => btn.disabled = true);
    setTimeout(showGameOverPrompt, 800);
}

buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        if (life <= 0) return;
        const humanChoice = choices[idx];
        const robotChoice = getRobotChoice();
        const result = decideWinner(humanChoice, robotChoice);

        // Change images with animation
        if (humanImg) {
            humanImg.src = imgMap[humanChoice];
            humanImg.classList.remove('animated');
            void humanImg.offsetWidth;
            humanImg.classList.add('animated');
        }
        if (robotImg) {
            robotImg.src = imgMap[robotChoice];
            robotImg.classList.remove('animated');
            void robotImg.offsetWidth;
            robotImg.classList.add('animated');
        }

        if (result === 'win') {
            humanScore++;
        } else if (result === 'lose') {
            robotScore++;
        }
        life--;
        updateUI(result);

        if (life === 0) {
            endGame();
        }
    });
});

updateUI();

