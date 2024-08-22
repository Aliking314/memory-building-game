const icons = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🥝', '🥑', '🥭', '🍍', '🍑'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let startTime;
let timerInterval;

// DOM elements
const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton');
const result = document.getElementById('result');

// Event listener for start button
startButton.addEventListener('click', startGame);

// Function to start the game
function startGame() {
    resetGame();
    shuffleIcons();
    createCards();
    renderCards();
    startTimer();
}

// Function to reset the game variables
function resetGame() {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    result.textContent = '';
    clearInterval(timerInterval);
}

// Function to shuffle icons array
function shuffleIcons() {
    for (let i = icons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [icons[i], icons[j]] = [icons[j], icons[i]];
    }
}

// Function to create card elements
function createCards() {
    for (let i = 0; i < icons.length; i++) {
        const card = {
            icon: icons[i],
            flipped: false,
            matched: false
        };
        cards.push(card);
        cards.push({...card}); // Create a pair of each icon
    }
    shuffleCards();
}

// Function to shuffle card array
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Function to render cards on the game board
function renderCards() {
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (card.flipped) {
            cardElement.textContent = card.icon;
            cardElement.classList.add('flipped');
        }
        cardElement.addEventListener('click', () => flipCard(index));
        gameBoard.appendChild(cardElement);
    });
}

// Function to flip a card
function flipCard(index) {
    if (!cards[index].matched && flippedCards.length < 2) {
        cards[index].flipped = true;
        flippedCards.push(index);
        renderCards();

        if (flippedCards.length === 2) {
            attempts++;
            if (cards[flippedCards[0]].icon === cards[flippedCards[1]].icon) {
                matchCards();
            } else {
                setTimeout(resetFlippedCards, 1000);
            }
        }
    }
}

// Function to handle matching cards
function matchCards() {
    cards[flippedCards[0]].matched = true;
    cards[flippedCards[1]].matched = true;
    flippedCards = [];
    matchedPairs++;

    if (matchedPairs === icons.length) {
        endGame();
    }
}

// Function to reset flipped cards
function resetFlippedCards() {
    cards[flippedCards[0]].flipped = false;
    cards[flippedCards[1]].flipped = false;
    flippedCards = [];
    renderCards();
}

// Function to start timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update timer
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    result.textContent = `Time: ${minutes}m ${seconds}s`;
}

// Function to end the game
function endGame() {
    clearInterval(timerInterval);
    result.textContent = `Congratulations! You won in ${attempts} attempts!`;
}

// Initial game setup
startGame();
