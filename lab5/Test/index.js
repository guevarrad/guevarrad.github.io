const chaosButton = document.querySelector('#chaos');
const themeToggle = document.querySelector('#theme');
const pieces = [...document.querySelectorAll('[data-piece]')];
const total = pieces.length;
const remainingText = document.querySelector('#remaining');
const countText = document.querySelector('#count');
const statusText = document.querySelector('#status');

let clicks = 0;

function updateStatus() {
  remainingText.textContent = `${pieces.length} / ${total} left`;
  countText.textContent = `${clicks} ${clicks === 1 ? 'click' : 'clicks'}`;

  if (pieces.length === 0) {
    statusText.textContent = 'Everything is gone. The colors can keep going.';
    chaosButton.textContent = 'Start over';
    return;
  }

  statusText.textContent = `${pieces.length} items still here.`;
}

function removePiece() {
  const index = Math.floor(Math.random() * pieces.length);
  const [piece] = pieces.splice(index, 1);
  piece.remove();
  clicks += 1;
  updateStatus();
}

themeToggle.addEventListener('click', () => {
  const light = document.body.classList.toggle('light');
  themeToggle.setAttribute('aria-pressed', String(!light));
  themeToggle.textContent = `Dark mode: ${light ? 'off' : 'on'}`;
});

chaosButton.addEventListener('click', () => {
  if (pieces.length === 0) {
    window.location.reload();
    return;
  }

  removePiece();
});

document.querySelector('#restore').addEventListener('click', () => {
  window.location.reload();
});

updateStatus();