const moves = ['rock', 'paper', 'scissors'];
const userMoveCounts = { rock: 0, paper: 0, scissors: 0 };
let userScore = 0, aiScore = 0, tieScore = 0;
const moveIcons = { rock: '🪨', paper: '📄', scissors: '✂️' };

function predictUserMove() {

  let maxMove = 'rock';
  let maxCount = userMoveCounts.rock;
  for (let move of moves) {
    if (userMoveCounts[move] > maxCount) {
      maxMove = move;
      maxCount = userMoveCounts[move];
    }
  }
  return maxMove;
}

function getAIMove() {
  const predicted = predictUserMove();
 
  if (predicted === 'rock') return 'paper';
  if (predicted === 'paper') return 'scissors';
  return 'rock';
}

function playRound(userMove) {
  userMoveCounts[userMove]++;
  const aiMove = getAIMove();

 
  document.getElementById('user-choice').textContent = userMove;
  document.getElementById('user-icon').textContent = moveIcons[userMove];
  document.getElementById('ai-choice').textContent = aiMove;
  document.getElementById('ai-icon').textContent = moveIcons[aiMove];

  let result = '';
  let userClass = '', aiClass = '';
  if (userMove === aiMove) {
    result = `Tie! Both chose ${userMove}.`;
    tieScore++;
    userClass = aiClass = 'tie';
  } else if (
    (userMove === 'rock' && aiMove === 'scissors') ||
    (userMove === 'paper' && aiMove === 'rock') ||
    (userMove === 'scissors' && aiMove === 'paper')
  ) {
    result = `You win! ${userMove} beats ${aiMove}.`;
    userScore++;
    userClass = 'winner';
    aiClass = 'loser';
  } else {
    result = `AI wins! ${aiMove} beats ${userMove}.`;
    aiScore++;
    userClass = 'loser';
    aiClass = 'winner';
  }


  const resultDiv = document.getElementById('result');
  resultDiv.textContent = result;
  resultDiv.classList.remove('result-animate');
  void resultDiv.offsetWidth; 
  resultDiv.classList.add('result-animate');

  document.getElementById('user-choice').parentElement.className = userClass;
  document.getElementById('ai-choice').parentElement.className = aiClass;

  document.getElementById('user-score').textContent = userScore;
  document.getElementById('ai-score').textContent = aiScore;
  document.getElementById('tie-score').textContent = tieScore;
}


function resetGame() {
  userScore = aiScore = tieScore = 0;
  userMoveCounts.rock = userMoveCounts.paper = userMoveCounts.scissors = 0;
  document.getElementById('user-score').textContent = userScore;
  document.getElementById('ai-score').textContent = aiScore;
  document.getElementById('tie-score').textContent = tieScore;
  document.getElementById('user-choice').textContent = '-';
  document.getElementById('ai-choice').textContent = '-';
  document.getElementById('user-icon').textContent = '';
  document.getElementById('ai-icon').textContent = '';
  document.getElementById('result').textContent = '';
  document.getElementById('user-choice').parentElement.className = '';
  document.getElementById('ai-choice').parentElement.className = '';
}

document.querySelectorAll('button[data-move]').forEach(btn => {
  btn.addEventListener('click', () => {
    playRound(btn.getAttribute('data-move'));
  });
});

document.getElementById('reset-btn').addEventListener('click', resetGame);