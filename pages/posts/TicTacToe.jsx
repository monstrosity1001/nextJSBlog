import { useState } from "react";
import styles from "../../styles/TicTacToe.module.css";
import Link from "next/link";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [moveOrderAscending, setMoveOrderAscending] = useState(true);
  const [row, setRow] = useState([]);
  const [col, setCol] = useState([]);
  const currentSquares = history[currentMove];
  const isXGo = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(moveJumpTo) {
    setCurrentMove(moveJumpTo);
  }

  function changeOrder() {
    setMoveOrderAscending(!moveOrderAscending);
  }

  function updateRow(rowNum) {
    setRow(newRow => [...row, rowNum])
  }

  function updateCol(colNum) {
    setCol(nextCol => [...col, colNum])
  }

  const moveList = history.map((squares, move) => {
    let description;
    if (move === currentMove && move > 0) {
      description = "You are at move #" + (move + 1);
    } else if (move > 0) {
      description = "(" + row[move] + ", " + col[move] + ")";
    } else if (move === 0 && currentMove === 0) {
      description = "You are at game start";
    } else if (move === 0) {
      description = "Go to game start";
    }
    if (move === 9) {
      return null;
    }
    if (move === currentMove) {
      return <li key={move}>{description}</li>;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board
          isXGo={isXGo}
          allSquares={currentSquares}
          onPlay={handlePlay}
          rowDecide={updateRow}
          colDecide={updateCol}
        />
      </div>
      <div>
        <button onClick={() => changeOrder()}>
          {moveOrderAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
      </div>
      <div className={styles.gameInfo}>
        <ol>{moveOrderAscending ? moveList : [...moveList].reverse()}</ol>
      </div>
      <div>
        <Link href='/posts/first-post'>Go back</Link>
      </div>
    </div>
  );
}

function Board({ isXGo, allSquares, onPlay, rowDecide, colDecide }) {
  const winner = checkWinner(allSquares);
  let message = "";
  if (winner && winner.player) {
    message = winner.player + " has won the game";
  } else if (winner && winner.isDraw) {
    message = "The game is a draw";
  } else {
    message = "Current move belongs to: " + (isXGo ? "X" : "O");
  }

  function handleClick(squareNumber) {
    rowDecide(Math.floor(squareNumber / 3) + 1);
    colDecide((squareNumber % 3) + 1);
    const nextSquares = allSquares.slice();
    if (nextSquares[squareNumber] || checkWinner(nextSquares)) {
      return;
    }
    if (isXGo) {
      nextSquares[squareNumber] = "X";
    } else {
      nextSquares[squareNumber] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div className={styles.boardRow} key={i}>
          {[...Array(3)].map((_, j) => {
            const index = i * 3 + j;

            return (
              <Square
                fillValue={allSquares[index]}
                onSquareClick={() => handleClick(index)}
                isWinner={winner && winner.combination.includes(index)}
                isDraw={winner && winner.isDraw}
              />
            );
          })}
        </div>
      ))}
      <div className={styles.status}>{message}</div>
    </>
  );
}

function Square({ fillValue, onSquareClick, isWinner, isDraw }) {
  if (isDraw) {
    return <button className={styles.drawSquare}>{fillValue}</button>;
  } else {
    return (
      <button
        className={isWinner ? styles.winningSquare : styles.square}
        onClick={onSquareClick}
      >
        {fillValue}
      </button>
    );
  }
}

function checkWinner(board) {
  const possibleCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let index = 0; index < possibleCombos.length; index++) {
    const [square1, square2, square3] = possibleCombos[index];
    if (
      board[square1] &&
      board[square1] === board[square2] &&
      board[square1] === board[square3]
    ) {
      return { player: board[square1], combination: possibleCombos[index] };
    } 
  }
  if (checkDraw(board)) {
    return { isDraw: true, combination: [10, 10, 10] };
  }
  return null;
}

function checkDraw(board) {
  for (let i = 0; i < board.length; i++) {
    const indValue = board[i];
    if (indValue === null) {
      return false;
    }
  }
  return true;
}

