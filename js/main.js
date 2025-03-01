let modes = document.querySelectorAll(`.game .container .chooseSection .modes span`);
let easy = document.querySelector(`.game .container .chooseSection .modes span:nth-child(1)`);
let chooseSection = document.querySelector(`.game .container .chooseSection`);
let gameSection = document.querySelector(`.game .container .gameSection`);
let type = document.querySelector(`.game .container .gameSection .top .type`);
let time = document.querySelector(`.game .container .gameSection .top .time`);
let btn = document.querySelector(`.game .container .gameSection .center button`);
let input = document.querySelector(`.game .container .center .input`);
let nextbtn = document.querySelector(`.game .container .center .input-wraper i`);
let word = document.querySelector(`.game .container .gameSection .center .word `);
let timer = document.querySelector(`.game .container .bottom .timer`);
let score = document.querySelector(`.game .container .bottom .score`);
let all = document.querySelector(`.game .container .bottom .all`);
let gameOver = document.querySelector(`.game .container .gameover`);
let rankSection = document.querySelector(`.game .container .rankSection`);
let statusSentence = document.querySelector(`.game .container .rankSection .status`);
let finalMark = document.querySelector(`.game .container .rankSection .rank`);
let retryBtn = document.querySelector(`.game .container .rankSection .btn`);
let passedWords = document.querySelector(`.game .container .center .passedWords .content`);
let words = ['Apple', 'Chair', 'Shadow', 'Thunder', 'Lantern', 'Capture', 'Imagine', 'Journey', 'Mountain', 'Velocity', 'Champion', 'Momentum', 'Guardian', 'Adventure', 'Phenomenon'];
let counter;
let currentCounter;
let i = 0;
let counterInterval;
window.onload = () => {
  all.textContent = words.length;
  score.textContent = i;
  input.value = '';
};
modes.forEach((mode) => {
  mode.onclick = () => {
    if (mode.textContent === 'Easy') {
      counter = 10;
      type.textContent = `[Easy]`;
      time.textContent = `[${counter}]`;
    } else if (mode.textContent === 'Normal') {
      counter = 8;
      type.textContent = '[Normal]';
      time.textContent = `[${counter}]`;
    } else if (mode.textContent === 'Hard') {
      counter = 5;
      type.textContent = '[Hard]';
      time.textContent = `[${counter}]`;
    }
    input.setAttribute('disabled', true);
    nextbtn.style.pointerEvents = 'none';
    chooseSection.style.display = 'none';
    gameSection.style.display = 'block';
    btn.style.display = 'block';
    timer.textContent = counter;
  };
});
btn.onclick = () => {
  input.removeAttribute('disabled');
  nextbtn.style.pointerEvents = 'auto';
  word.style.display = 'block';
  word.textContent = words[i];
  btn.style.display = 'none';
  input.focus();
  Qcounter();
  gameOver.style.display = 'none';
  currentCounter = timer.textContent;
};

function Qcounter() {
  counterInterval = setInterval(() => {
    if (--counter > 0) {
      timer.textContent = counter;
    }
    if (counter === 0) {
      timer.textContent = 0;
      gameOver.style.display = 'block';
      btn.style.display = 'block';
      word.style.display = 'none';
      input.setAttribute('disabled', true);
      nextbtn.style.pointerEvents = 'none';
      showFinalscore();
    }
  }, 1000);
}

input.addEventListener('input', () => {
  if (input.value.trim().toLowerCase() === word.textContent.toLowerCase()) {
    i++;
    word.textContent = words[i];
    input.value = '';
    clearInterval(counterInterval);
    counter = currentCounter;
    Qcounter();
    score.textContent = i;
    let passedWord = document.createElement(`span`);
    passedWord.textContent = words[i - 1];
    passedWords.appendChild(passedWord);
  }
  if (i === words.length) {
    showFinalscore();
  }
});

nextbtn.addEventListener('click', () => {
  console.log('next btn');
  if (input.value === word.textContent.toLowerCase()) {
    i++;
    word.textContent = words[i];
    input.value = '';
    clearInterval(counterInterval);
    counter = currentCounter;
    Qcounter();
    score.textContent = i;
    let passedWord = document.createElement(`span`);
    passedWord.textContent = words[i - 1];
    passedWords.appendChild(passedWord);
    console.log('here');
  }
  if (i === words.length) {
    showFinalscore();
  }
});
function showFinalscore() {
  gameSection.style.display = 'none';
  rankSection.style.display = 'flex';
  if (score.textContent < 0.25 * words.length) {
    statusSentence.textContent = 'So Bad !!';
  }
  if (score.textContent < 0.75 * words.length && score.textContent > 0.25 * words.length) {
    statusSentence.textContent = 'Not Bad !!';
  }
  if (score.textContent > 0.75 * words.length) {
    statusSentence.textContent = 'Congratulations !!';
  }
  if (score.textContent === 0) {
    console.log('rank');
    statusSentence.textContent = 'failed !!';
  }
  finalMark.textContent = `Your rank IS: ${score.textContent}/${words.length}`;
}

retryBtn.onclick = () => {
  i = 0;
  chooseSection.style.display = 'flex';
  rankSection.style.display = 'none';
  score.textContent = i;
  clearInterval(counterInterval);
  passedWords.innerHTML = '';
  gameOver.style.display = 'none';
};

let footerYear = document.querySelector(`footer .year`);
let date = new Date();
footerYear.textContent = date.getFullYear();
