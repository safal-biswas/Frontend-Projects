document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const flagsLeft = document.getElementById("flagsLeft");
  const resultContainer = document.getElementById("resultContainer");
  const result = document.getElementById("result");
  const width = 10;
  let bombAmount = 20;
  let squares = [];
  let isGameOver = false;
  let flags = 0;

  //create Board
  function createBoard() {
    flagsLeft.innerHTML = bombAmount;

    //get shuffled
    const bombArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    //make cells, gives id & class name to each
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.id = i;
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      //normal click
      square.addEventListener("click", () => {
        click(square);
      });

      //ctrl & left click
      square.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        addFlag(square);
      });
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains("valid")) {
        if (!isLeftEdge && squares[i - 1].classList.contains("bomb")) total++;
        if (!isRightEdge && squares[i + 1].classList.contains("bomb")) total++;
        if (i > 9 && squares[i - width].classList.contains("bomb")) total++;
        if (i < 90 && squares[i + width].classList.contains("bomb")) total++;

        if (
          i > 9 &&
          !isLeftEdge &&
          squares[i - width - 1].classList.contains("bomb")
        ) {
          total++;
        }
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i - width + 1].classList.contains("bomb")
        ) {
          total++;
        }
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i + width - 1].classList.contains("bomb")
        ) {
          total++;
        }
        if (
          i < 89 &&
          !isRightEdge &&
          squares[i + width + 1].classList.contains("bomb")
        ) {
          total++;
        }
      }
      squares[i].setAttribute("data", total);
    }
  }
  createBoard();

  //add flag with right click
  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.innerHTML = "🚩";
        square.classList.add("flag");
        flags++;
        flagsLeft.innerHTML = bombAmount - flags;
        checkForWin();
      } else {
        square.innerHTML = "";
        square.classList.remove("flag");
        flags--;
        flagsLeft.innerHTML = bombAmount - flags;
      }
    }
  }

  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < width * width; i++) {
      if (
        squares[i].classList.contains("bomb") &&
        squares[i].classList.contains("flag")
      ) {
        matches++;
      }
    }
    if (matches == bombAmount) {
      resultContainer.style.display = "block";
      result.innerHTML = "YOU WIN!";
    }
  }

  function click(square) {
    if (
      isGameOver ||
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    ) {
      return;
    }

    if (square.classList.contains("bomb")) {
      gameOver();
    } else {
      total = square.getAttribute("data");
      if (total != 0) {
        if (total == 1) square.classList.add("one");
        if (total == 2) square.classList.add("two");
        if (total == 3) square.classList.add("three");
        if (total == 4) square.classList.add("four");
        if (total == 5) square.classList.add("five");
        if (total == 6) square.classList.add("six");
        if (total == 7) square.classList.add("seven");
        if (total == 8) square.classList.add("eight");
        square.innerHTML = total;
        square.classList.add("checked");
        return;
      }
      //zero valid fanOut
      checkSquare(square);
    }
    square.classList.add("checked");
  }

  //check neighboring cells
  function checkSquare(square) {
    const currentId = square.id;
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (!isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (!isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9) {
        const newId = squares[parseInt(currentId) - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - width - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) - width + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) + width - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + width + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  function gameOver() {
    resultContainer.style.display = "block";
    result.innerHTML = "Game Over!";
    isGameOver = true;

    //show all the bombs
    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "💣";
        square.classList.remove("bomb");
        square.classList.add("checked");
      }
    });
  }
});
