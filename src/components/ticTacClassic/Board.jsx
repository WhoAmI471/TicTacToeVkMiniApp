import React, { useState, useEffect } from 'react';
import Square from './Square';
import tic from '../../assets/tic.svg';
import tac from '../../assets/tac.svg';
import './Board.css';

const Board = ({botActive, botLevel, boardSize}) => {
  const [ticPlayer, setTicPlayer] = useState(0);
  const [tacPlayer, setTacPlayer] = useState(0);

  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  
  const [winner, setWinner] = useState(null);

  const checkWinnerCombinationsThree = (boardSize) => {
    const combinations = [];

    // Горизонтальные комбинации
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j <= boardSize - 3; j++) {
        combinations.push(Array.from({ length: 3 }, (_, index) => i * boardSize + j + index));
      }
    }
  
    // Вертикальные комбинации
    for (let i = 0; i <= boardSize - 3; i++) {
      for (let j = 0; j < boardSize; j++) {
        combinations.push(Array.from({ length: 3 }, (_, index) => (i + index) * boardSize + j));
      }
    }
  
    // Диагональные комбинации
    for (let i = 0; i <= boardSize - 3; i++) {
      for (let j = 0; j <= boardSize - 3; j++) {
        combinations.push(Array.from({ length: 3 }, (_, index) => (i + index) * (boardSize + 1) + j));
        combinations.push(Array.from({ length: 3 }, (_, index) => (i + index) * (boardSize - 1) + j + 2));
      }
    }
  
    return combinations;
  };

  const checkWinnerCombinations = (boardSize) => {
    const combinations = [];

    // Горизонтальные комбинации
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j <= boardSize - 4; j++) {
        combinations.push(Array.from({ length: 4 }, (_, index) => i * boardSize + j + index));
      }
    }

    // Вертикальные комбинации
    for (let i = 0; i <= boardSize - 4; i++) {
      for (let j = 0; j < boardSize; j++) {
        combinations.push(Array.from({ length: 4 }, (_, index) => (i + index) * boardSize + j));
      }
    }

    // Диагональные комбинации
    for (let i = 0; i <= boardSize - 4; i++) {
      for (let j = 0; j <= boardSize - 4; j++) {
        combinations.push(Array.from({ length: 4 }, (_, index) => (i + index) * (boardSize + 1) + j));
        combinations.push(Array.from({ length: 4 }, (_, index) => (i + index) * (boardSize - 1) + j + 3));
      }
    }

    return combinations;
  };

  // Shuffle the linesToCheck array
  const linesToCheck = boardSize === 3 
  ? checkWinnerCombinationsThree(boardSize) 
  : checkWinnerCombinations(boardSize);

  useEffect(() => {
    if (botActive && !isNextX){
      makeBotMove();
    }
  }, [botActive, isNextX]);


  const checkWinner = () => {
    const winnerCombinations = boardSize === 3 
    ? checkWinnerCombinationsThree(boardSize) 
    : checkWinnerCombinations(boardSize);

    console.log(winnerCombinations);

    if (boardSize == 3) {
      for (let combination of winnerCombinations) {
        const [a, b, c] = combination;
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
          return squares[a] === tic ? tic : tac;
        }
      }
    } else {
      for (let combination of winnerCombinations) {
        const [a, b, c, d] = combination;
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[d]) {
          return squares[a] === tic ? tic : tac;
        }
      }

    }
    
    return null;
  };

  const makeBotMove = () => {
    const emptySquares = squares.reduce((acc, square, index) => {
      if (!square) {
        acc.push(index);
      }
      return acc;
    }, []);
  
    let randomIndex = null;
    let randomSquare = null;
  
    switch (botLevel) {
      case 'easy':
        console.log('easy');
        randomIndex = Math.floor(Math.random() * emptySquares.length);
        randomSquare = emptySquares[randomIndex];
        setSquareValue(randomSquare);
        break;
  
      case 'medium':
        console.log('medium');
        // Check if the bot can win in the next move
        for (let i = 0; i < emptySquares.length; i++) {
          const squareIndex = emptySquares[i];
          const newSquares = squares.slice();
          newSquares[squareIndex] = isNextX ? tic : tac;
          if (checkWinner(newSquares) === (isNextX ? tic : tac)) {
            setSquareValue(squareIndex);
            return;
          }
        }
  
        // Check if the user can win in the next move and block them
        for (let i = 0; i < emptySquares.length; i++) {
          const squareIndex = emptySquares[i];
          const newSquares = squares.slice();
          newSquares[squareIndex] = isNextX ? tac : tic;
          if (checkWinner(newSquares) === (isNextX ? tac : tic)) {
            setSquareValue(squareIndex);
            return;
          }
        }
        randomIndex = Math.floor(Math.random() * emptySquares.length);
        randomSquare = emptySquares[randomIndex];
        setSquareValue(randomSquare);
        break;
  
      case 'hard':
        console.log('hard');
        // Check for possible winning moves for the bot and make them
        for (let i = 0; i < emptySquares.length; i++) {
          const squareIndex = emptySquares[i];
          const newSquares = squares.slice();
          newSquares[squareIndex] = isNextX ? tic : tac;
          if (checkWinner(newSquares) === (isNextX ? tic : tac)) {
            setSquareValue(squareIndex);
            return;
          }
        }

        // Check for possible winning moves for the player and block them
        for (let i = 0; i < emptySquares.length; i++) {
          const squareIndex = emptySquares[i];
          const newSquares = squares.slice();
          newSquares[squareIndex] = isNextX ? tac : tic;
          if (checkWinner(newSquares) === (isNextX ? tac : tic)) {
            setSquareValue(squareIndex);
            return;
          }
        }

        // Shuffle the linesToCheck array
        shuffleArray(linesToCheck);

        // Check for possible winning moves for the bot and prioritize them
        for (let line of linesToCheck) {
          const [a, b, c] = line;
          const lineSquares = [squares[a], squares[b], squares[c]];
          const emptyIndex = lineSquares.findIndex(square => !square);
          if (emptyIndex !== -1) {
            const squareIndex = line[emptyIndex];
            const newSquares = squares.slice();
            newSquares[squareIndex] = isNextX ? tic : tac;
            if (checkWinner(newSquares) === (isNextX ? tic : tac)) {
              setSquareValue(squareIndex);
              return;
            }
          }
        }

        // Check for possible winning moves for the player and block them
        for (let line of linesToCheck) {
          const [a, b, c] = line;
          const lineSquares = [squares[a], squares[b], squares[c]];
          const emptyIndex = lineSquares.findIndex(square => !square);
          if (emptyIndex !== -1) {
            const squareIndex = line[emptyIndex];
            const newSquares = squares.slice();
            newSquares[squareIndex] = isNextX ? tac : tic;
            if (checkWinner(newSquares) === (isNextX ? tac : tic)) {
              setSquareValue(squareIndex);
              return;
            }
          }
        }

        // Check for possible winning moves for the bot and prioritize them
        for (let line of linesToCheck) {
          const [a, b, c] = line;
          const lineSquares = [squares[a], squares[b], squares[c]];
          const emptyIndex = lineSquares.findIndex(square => !square);
          if (emptyIndex !== -1) {
            const squareIndex = line[emptyIndex];
            const newSquares = squares.slice();
            newSquares[squareIndex] = isNextX ? tic : tac;
            if (checkWinner(newSquares) === (isNextX ? tic : tac)) {
              setSquareValue(squareIndex);
              return;
            }
          }
        }

        // If no winning move, blocking move, or prioritized winning move is found, prioritize the center square
        const centerSquareIndex = 4;
        if (squares[centerSquareIndex] === null) {
          setSquareValue(centerSquareIndex);
          return;
        }

        // If the center square is taken, select a random empty square
        randomIndex = Math.floor(Math.random() * emptySquares.length);
        randomSquare = emptySquares[randomIndex];
        setSquareValue(randomSquare);

        break;
  
      default:
        break;
    }
  };

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const setSquareValue = (i) => {
    if (winner) {
      return;
    }
    if (squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isNextX ? tic : tac;
    setIsNextX(!isNextX);
    setSquares(newSquares);
  };

  useEffect(() => {
    const newWinner = checkWinner();
    if (newWinner) {
      setWinner(newWinner);
      if (newWinner === tic) {
        setTicPlayer((prevTicPlayer) => prevTicPlayer + 1);
      } else if (newWinner === tac) {
        setTacPlayer((prevTacPlayer) => prevTacPlayer + 1);
      }
      setWinner(null);

      setSquares(Array(boardSize * boardSize).fill(null));
      setIsNextX(true);
      console.log("new");
      
      shuffleArray(linesToCheck);
    } else if (squares.every((square) => square !== null)) {
      setIsNextX(true);
      setSquares(Array(boardSize * boardSize).fill(null));
    }
  }, [squares, winner]);

  const squareSize = `${(200 / boardSize)}px`; // Вычисляем размер клетки

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100vh', justifyContent: 'center' }}>
      <div className="info">
        <div className={`sides ${isNextX ? 'active' : ''}`}>
          <img src={tic} className='tic' alt="tic" />
        </div>

        <h1 className="score">
          <div> {ticPlayer}</div> <div> : </div> <div> {tacPlayer} </div>
        </h1>

        <div className={`sides ${!isNextX ? 'active' : ''}`}>
          <img src={tac} className='tac' alt="tac" />
        </div>
      </div>

      <div className="board" style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, ${squareSize})`,
        gridTemplateRows: `repeat(${boardSize}, ${squareSize})`,
        gap: '5px',
        width: (boardSize * (100 / boardSize) + (boardSize - 1) * 5) + 'px', // Учитываем промежутки между клетками
        margin: 'auto', // Центрирование по горизонтали
        justifyContent: 'space-around'
      }}>
        {squares.map((square, index) => (
          <Square key={index} value={square} setSquareValue={() => setSquareValue(index)} size={squareSize} />
        ))}
      </div>
    </div>
  );
}

export default Board;
