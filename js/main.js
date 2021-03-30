import { fetchData } from "./fetch.js";
window.addEventListener('load', init);


let time = 5;
let score = 0;
let increment = 0;
let isPlaying;

// DOM elements
const DOMstrings = {
 wordInput: document.querySelector('#word-input'),
 currentWord: document.querySelector('#current-word'),
 scoreDIsplay: document.querySelector('#score'),
 timeDisplay: document.querySelector('#time'),
 message: document.querySelector('#message'),
 seconds: document.querySelector('#seconds')
}

let allWords = [];

function init() {
    // Load word from API array
    fetchData().then(data => {
        data.forEach(e => allWords.push(e));
        DOMstrings.currentWord.innerHTML = allWords[increment];
    });
    // Start matching on word input
    DOMstrings.wordInput.addEventListener('input', startMatch);
    // Countdown
    setInterval(countdown, 1000);
    // Check Game status
    setInterval(checkStatus, 50);
}

function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = 6;
        // new word???
        increment++;
        DOMstrings.currentWord.innerHTML = allWords[increment];
        DOMstrings.wordInput.value = '';
        score++;
    }
    DOMstrings.scoreDIsplay.innerHTML = score;
}

// Match currentWord to wordInput
function matchWords() {
    if(DOMstrings.wordInput.value === DOMstrings.currentWord.innerHTML) {
        DOMstrings.message.innerHTML = 'Correct!';
        return true;
    } else {
        DOMstrings.message.innerHTML = '';
        return false;
    }
}

// Countdown timer func
function countdown() {
    // Check if time is not 0
    if(time > 0) {
        time--;
    } else if(time === 0) {
        // Game Over
       isPlaying = false;
       score = 0;
       startMatch();
    }
    // Show the time
    DOMstrings.timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus() {
    if(!isPlaying && time === 0) {
        DOMstrings.message.innerHTML = 'Game Over!';
    }
}