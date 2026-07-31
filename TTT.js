const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  gameOver = false;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "#ffffc7";
  });
  msgContainer.classList.add("hide");
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  gameOver = true;
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      boxes[a].style.backgroundColor = "#90ee90";
      boxes[b].style.backgroundColor = "#90ee90";
      boxes[c].style.backgroundColor = "#90ee90";

      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  let filled = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") filled++;
  });

  if (filled === 9 && !gameOver) {
    msg.innerText = "😅 It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver) return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;

    if (!checkWinner()) {
      checkDraw();
    }
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
 
