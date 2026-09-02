const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startGameBtn = document.getElementById('startGame');
const gameArea = document.getElementById('gameArea');

let score = 0;
let timeLeft = 20;
let timerId = null;
let isPlaying = false;

function createHeart() {
  const heart = document.createElement('button');
  heart.className = 'heart';
  heart.type = 'button';

  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;

  const left = Math.random() * maxX;
  const top = Math.random() * maxY;

  heart.style.left = `${left}px`;
  heart.style.top = `${top}px`;

  heart.addEventListener('click', () => {
    if (!isPlaying) return;
    score += 1;
    scoreEl.textContent = score;
    heart.remove();
    createHeart();
  });

  gameArea.appendChild(heart);
}

function stopGame() {
  isPlaying = false;
  clearInterval(timerId);

  Array.from(gameArea.querySelectorAll('.heart')).forEach((heart) => heart.remove());
  startGameBtn.textContent = 'Play again';
  startGameBtn.style.display = 'inline-flex';

  const message = score >= 10
    ? 'You won the love game! Nandu is absolutely adored 💖'
    : score >= 5
      ? 'Nice try! Your love is growing every second 🌷'
      : 'A tiny bit more love and the heart meter will explode 💞';

  const result = document.createElement('div');
  result.className = 'result';
  result.textContent = message;
  result.style.position = 'absolute';
  result.style.bottom = '18px';
  result.style.left = '50%';
  result.style.transform = 'translateX(-50%)';
  result.style.background = 'rgba(255,255,255,0.12)';
  result.style.border = '1px solid rgba(255,255,255,0.12)';
  result.style.padding = '0.7rem 1rem';
  result.style.borderRadius = '999px';
  result.style.fontWeight = '600';
  result.style.color = '#fff5fb';

  const existingResult = gameArea.querySelector('.result');
  if (existingResult) existingResult.remove();

  gameArea.appendChild(result);
}

function startGame() {
  score = 0;
  scoreEl.textContent = score;
  timeLeft = 20;
  timeEl.textContent = timeLeft;
  isPlaying = true;

  const existingResult = gameArea.querySelector('.result');
  if (existingResult) existingResult.remove();

  Array.from(gameArea.querySelectorAll('.heart')).forEach((heart) => heart.remove());
  startGameBtn.style.display = 'none';

  for (let i = 0; i < 5; i += 1) {
    createHeart();
  }

  timerId = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      stopGame();
      return;
    }

    if (Math.random() > 0.4) {
      createHeart();
    }
  }, 1000);
}

startGameBtn.addEventListener('click', startGame);
