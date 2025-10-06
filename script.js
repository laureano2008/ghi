let randomNumber = Math.floor(Math.random() * 100) + 1; // Número aleatório entre 1 e 100
let attempts = 0; // Contador de tentativas

document.getElementById('check-button').addEventListener('click', function() {
    let userGuess = parseInt(document.getElementById('guess').value);
    let message = document.getElementById('message');
    let attemptsDisplay = document.getElementById('attempts');
    
    // Incrementa o número de tentativas
    attempts++;

    // Valida se o palpite do usuário é um número válido
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Por favor, insira um número entre 1 e 100!";
        message.style.color = "red";
        return;
    }

    // Verifica se o palpite está correto
    if (userGuess < randomNumber) {
        message.textContent = "Muito baixo! Tente novamente.";
        message.style.color = "blue";
    } else if (userGuess > randomNumber) {
        message.textContent = "Muito alto! Tente novamente.";
        message.style.color = "blue";
    } else {
        message.textContent = `Parabéns! Você acertou o número ${randomNumber} em ${attempts} tentativas.`;
        message.style.color = "green";
    }

    attemptsDisplay.textContent = `Tentativas: ${attempts}`;
});
