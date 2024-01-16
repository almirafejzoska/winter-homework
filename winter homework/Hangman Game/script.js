let wordsGames = ['VALORANT', 'LEAGUE OF LEGENDS', 'MINECRAFT'];
let wordsBooks = ['CRIME AND PUNISHMENT', 'DON QUIXOTE', 'BRAVE NEW WORLD'];
let wordsTVShow = ['THE WIRE', 'MODERN FAMILY', 'THE OFFICE'];
let chosenWord = '';
let guessedLetters = [];
let lives = 6;

function chooseWord(category) {
    let words;
    switch (category) {
        case 'Games':
            words = wordsGames;
            break;
        case 'Books':
            words = wordsBooks;
            break;
        case 'TVShow':
            words = wordsTVShow;
            break;
    }
    let randomIndex = Math.floor(Math.random() * words.length);
    chosenWord = words[randomIndex];
}

function checkGameOver() {
    if (lives <= 0) {
        return 'Death';
    } else if (chosenWord.split('').every(letter => guessedLetters.includes(letter))) {
        return 'Victory';
    } else {
        return 'Still Playing';
    }
}

function endGame() {
    checkGameStatus();
}

function checkGameStatus() {
    let gameStatus = checkGameOver();
    let message = '';

    if (gameStatus === 'Victory') {
        message = 'Congratulations! You won!';
    } else if (gameStatus === 'Death') {
        message = 'Sorry, you lost!';
    }

    if (message) {
        let categoryText = document.querySelector('.category');
        categoryText.textContent = message;
        disableAlphabetButtons();
    }
}


function updateRemainingLives() {
    let remainingLivesElement = document.getElementById('remainingLives');
    remainingLivesElement.textContent = lives;
    if (lives === 0) {
        endGame();
    }
}

function updateDisplayedWord() {
    let wordPlaceholder = document.querySelector('.word');
    wordPlaceholder.innerHTML = getWordPlaceholder();
    checkGameStatus();
}

function disableAlphabetButtons() {
    let alphabetButtons = document.querySelectorAll('.alphabet button');
    alphabetButtons.forEach(function (button) {
        button.disabled = true; // disable the button
    });
}

function startGame() {
    initializeGame();
    let gameInterval = setInterval(function () {
        if (checkGameOver() !== 'Still Playing') {
            clearInterval(gameInterval);
            endGame();
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', function () {
    let blurOverlay = document.getElementById('blurOverlay');
    blurOverlay.style.display = 'block';
    let categoryModal = document.getElementById('categoryModal');
    categoryModal.style.display = 'block';

    let startGameBtn = document.getElementById('startGameBtn');
    startGameBtn.addEventListener('click', function () {
        let selectedCategory = document.getElementById('categorySelect').value;
        blurOverlay.style.display = 'none';
        categoryModal.style.display = 'none';
        initializeGame(selectedCategory);
    });

    let alphabetButtons = document.querySelectorAll('.alphabet button');
    alphabetButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let letter = button.textContent;
            guessLetter(letter);
        });
    });

    let hintButton = document.querySelector('.hint');
    hintButton.addEventListener('click', function () {
        showHint();
    });

    let playAgainButton = document.querySelector('.playAgain');
    playAgainButton.addEventListener('click', function () {
        location.reload();
    });
});

function initializeGame(category) {
    let categoryText = document.querySelector('.category');
    categoryText.textContent = 'The Chosen Category Is ' + category;
    lives = 6;
    updateRemainingLives();
    chooseWord(category);
    updateDisplayedWord();
}

function getWordPlaceholder() {
    return chosenWord
        .split('')
        .map((letter) => (letter === ' ' ? '-' : guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

function guessLetter(letter) {
    let lowerCaseChosenWord = chosenWord.toLowerCase();
    if (lowerCaseChosenWord.includes(letter.toLowerCase())) {
        guessedLetters.push(letter);
        updateDisplayedWord();
    } else {
        lives--;
        updateRemainingLives();
        if (lives === 0) {
            checkGameStatus();
        }
    }
}

let hints = {
    'VALORANT': 'FPS shooter',
    'LEAGUE OF LEGENDS': 'MOBA game',
    'MINECRAFT': 'Survival game',
    'CRIME AND PUNISHMENT': 'A book by Dostoevsky',
    'DON QUIXOTE': 'A must-read book',
    'BRAVE NEW WORLD': 'Book by Aldous Huxley',
    'THE WIRE': 'Crime show',
    'MODERN FAMILY': 'Comedy show',
    'THE OFFICE': 'Comedy show'
};

function showHint() {
    let clueText = document.querySelector('.clue');
    clueText.textContent = 'Clue - ' + hints[chosenWord];
}
