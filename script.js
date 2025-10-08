let numberToGuess = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let maxAttempts = 10;
let timeLeft = 30; // 30 segundos para adivinhar
let timer;
let audioCorrect = new Audio('https://www.soundjay.com/button/beep-07.wav');
let audioIncorrect = new Audio('https://www.soundjay.com/button/beep-02.wav');

const guessInput = document.getElementById('guess');
const checkButton = document.getElementById('check-button');
const messageDiv = document.getElementById('message');
const attemptsDiv = document.getElementById('attempts');
const timerDiv = document.getElementById('timer');

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timerDiv.textContent = `Tempo restante: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showMessage('Você perdeu! O tempo acabou.', 'incorrect');
        }
    }, 1000);
}

function showMessage(message, className) {
    messageDiv.textContent = message;
    messageDiv.className = className;
}

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        showMessage('Digite um número entre 1 e 100!', 'incorrect');
        return;
    }

    attempts++;
    attemptsDiv.textContent = `Tentativas: ${attempts}/${maxAttempts}`;

    if (guess === numberToGuess) {
        clearInterval(timer);
        audioCorrect.play();
        showMessage('Parabéns! Você acertou o número!', 'correct');
    } else if (attempts >= maxAttempts) {
        clearInterval(timer);
        audioIncorrect.play();
        showMessage(`Você atingiu o número máximo de tentativas! O número era ${numberToGuess}.`, 'incorrect');
    } else {
        audioIncorrect.play();
        if (guess < numberToGuess) {
            showMessage('O número é maior. Tente novamente!', 'incorrect');
        } else {
            showMessage('O número é menor. Tente novamente!', 'incorrect');
        }
    }

    guessInput.value = '';
}

checkButton.addEventListener('click', checkGuess);

// Iniciar o jogo
startTimer();
