let numberToGuess;
let attempts = 0;
let maxAttempts;
let timeLeft;
let timer;
let difficulty;
let audioCorrect = new Audio('https://www.soundjay.com/button/beep-07.wav');
let audioIncorrect = new Audio('https://www.soundjay.com/button/beep-02.wav');
const guessInput = document.getElementById('guess');
const checkButton = document.getElementById('check-button');
const resetButton = document.getElementById('reset-button');
const messageDiv = document.getElementById('message');
const attemptsDiv = document.getElementById('attempts');
const timerDiv = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');

// Configurar o jogo conforme o nível de dificuldade
function setDifficulty() {
    difficulty = difficultySelect.value;

    if (difficulty === 'easy') {
        maxAttempts = 15;
        numberToGuess = Math.floor(Math.random() * 50) + 1;  // Intervalo de 1 a 50
        timeLeft = 60;  // 1 minuto
    } else if (difficulty === 'medium') {
        maxAttempts = 10;
        numberToGuess = Math.floor(Math.random() * 100) + 1;  // Intervalo de 1 a 100
        timeLeft = 45;  // 45 segundos
    } else {
        maxAttempts = 7;
        numberToGuess = Math.floor(Math.random() * 150) + 1;  // Intervalo de 1 a 150
        timeLeft = 30;  // 30 segundos
    }

    attempts = 0;
    attemptsDiv.textContent = `Tentativas: ${attempts}/${maxAttempts}`;
    startTimer();
    messageDiv.textContent = `Tente adivinhar o número entre 1 e ${numberToGuess}`;
}

// Iniciar o cronômetro
function startTimer() {
    timerDiv.textContent = `Tempo restante: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `Tempo restante: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showMessage('Você perdeu! O tempo acabou!', 'incorrect');
        }
    }, 1000);
}

// Exibir mensagem
function showMessage(message, className) {
    messageDiv.textContent = message;
    messageDiv.className = className;
}

// Verificar o palpite
function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 150) {
        showMessage('Digite um número válido entre 1 e 150!', 'incorrect');
        return;
    }

    attempts++;
    attemptsDiv.textContent = `Tentativas: ${attempts}/${maxAttempts}`;

    if (guess === numberToGuess) {
        clearInterval(timer);
        audioCorrect.play();
        showMessage('Parabéns! Você acertou o número!', 'correct');
        resetButton.style.display = 'block';  // Mostrar o botão de reiniciar
    } else if (attempts >= maxAttempts) {
        clearInterval(timer);
        audioIncorrect.play();
        showMessage(`Você atingiu o número máximo de tentativas! O número era ${numberToGuess}.`, 'incorrect');
        resetButton.style.display = 'block';
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

// Reiniciar o jogo
function resetGame() {
    resetButton.style.display = 'none';
    guessInput.value = '';
    setDifficulty();
}

checkButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
difficultySelect.addEventListener('change', setDifficulty);

// Iniciar o jogo com o nível de dificuldade selecionado
setDifficulty();
