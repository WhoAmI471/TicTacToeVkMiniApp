import { useState, useEffect } from "react";
import { calculateWinner, findBoardsWon } from "./CalculateWinner";
import SmallBoard from "./SmallBoard";
import { minMaxMove } from "../../AI/Ai";

import tic from '../../assets/tic.svg';
import tac from '../../assets/tac.svg';

const BigBoard = ({ socket, robot, appStatus, playerIsX, turnNext }) => {
  let initalPosition = [];
  for (let i = 0; i < 9; i++) {
    initalPosition.push(Array(9).fill(null));
  }
  const [gamePosition, setGamePosition] = useState(initalPosition);
  const [lastMove, setLastMove] = useState(null);

  const [movesHistory, setMovesHistory] = useState([]);

  const [boardTurn, setBoardTurn] = useState(null);
  const [lastBoardTurn, setLastBoardTurn] = useState(null);
  const [boardPosition, setBoardPosition] = useState(null);
  const [lastBoardPosition, setLastBoardPosition] = useState(null);

  const [next, setNext] = useState(((turnNext === "X") == playerIsX));
  
  const opponentSymbol = playerIsX ? tac : tic;
  const mySymbol = !playerIsX ? tac : tic;

  const messageUpdate = {
    method: "update",
    turn: opponentSymbol,
    board: boardTurn,
    lastMove: boardPosition,
    movesHistory: movesHistory
  };

  const messageOponentMove = {
    method: "opponentMove",
    turn: opponentSymbol,
    board: boardTurn,
    position: boardPosition,
  };

  let moveCount = 0;
  gamePosition.forEach((boardTu) => {
    boardTu.forEach((square) => {
      if (square) {
        moveCount += 1;
      }
    });
  });

  let xNext = (moveCount + 1) % 2 ? true : false;
  let currentGame = Array(9).fill(true);

  let status = xNext
    ? "X to play in any highlighted square"
    : "O to play in a highlighted square";

  if (appStatus !== "localGame" && xNext !== playerIsX) {
    status = "Waiting for opponent to move...";
  }
  const currentPlayer = playerIsX ? 'tic' : 'tac';

  function updateGame(board, position, x = xNext) {
    if (appStatus === "aiGame" && xNext !== playerIsX) return;
    if (appStatus !== "localGame" && appStatus !== "aiGame" && xNext !== playerIsX) return;
  
    let nextPosition = structuredClone(gamePosition);

    let player = tic;
    if (!x) {
      player = tac;
    }

    if (appStatus === "localGame") {
      nextPosition[board][position] = player;
    } else {
      nextPosition[board][position] = mySymbol;
    }
    
    setGamePosition(nextPosition);
    setLastMove(position);
    setMovesHistory([...movesHistory, { board, position }]);
  
    console.log(`${currentPlayer} made a move nextPosition[${board}][${position}]`);
    
    setBoardPosition(position);
    setBoardTurn(board);

    if (socket) {
      console.log(`SendMove board: ${board}, position: ${position}`);
      socket.send(JSON.stringify({
        method: "opponentMove",
        turn: opponentSymbol,
        board: board,
        position: position,
      }));
    }
    return nextPosition[board];
  }
  
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
  
        if (response.method === "opponentMove") {
          setGamePosition(prevGamePosition => {
            const nextPosition = structuredClone(prevGamePosition);
            nextPosition[response.board][response.position] = opponentSymbol;
            setLastMove(response.position);
            setBoardPosition(response.position);
            setBoardTurn(response.board);
            return nextPosition;
          });
        } 
      };
    }
  }, [socket]);
  
  // useEffect(() => {
  // async function SendMove() {
  //   if (socket && boardTurn !== null && boardPosition !== null){
  //     // if (lastBoardPosition !== boardPosition && lastBoardTurn !== boardTurn){
  //       // if (next){
  //         console.log(`Sending move for opponent nextPosition[${boardTurn}][${boardPosition}]`);
  
  //         setNext(false);
  //         setLastBoardPosition(boardPosition);
  //         setLastBoardTurn(boardTurn);
  //         socket.send(JSON.stringify(messageOponentMove));
  //       // }
  //     // }
  //   }
  // }
  // }, [boardTurn, boardPosition])

  const boardsFinished = findBoardsWon(gamePosition);
  let overallWinner = calculateWinner(boardsFinished);

  if (boardsFinished[lastMove] || lastMove === null) {
    currentGame = boardsFinished.map((board) => !board);
  } else {
    currentGame = Array(9).fill(false);
    currentGame[lastMove] = true;
  }
  
  if (xNext !== playerIsX && appStatus === "aiGame" && !overallWinner) {
    const robotMove = minMaxMove(lastMove + 0, gamePosition, xNext, robot)[1];
    console.log(robotMove);
    const robotPlayer = playerIsX ? tac : tic;
    let nextPosition = structuredClone(gamePosition);
    nextPosition[robotMove[0]][robotMove[1]] = robotPlayer;
    setTimeout(() => {
      setGamePosition(nextPosition);
      setLastMove(robotMove[1]);
    }, 1000);
  }

  // if (xNext !== playerIsX && appStatus !== "aiGame" && appStatus !== "localhost" && !overallWinner && socket) {
  //   console.log(turnNext);
  //   socket.onmessage = (event) => {
  //     console.log(1);
  //     const response = JSON.parse(event.data);
  //     if (response.method === "opponentMove") {
  //       console.log(2);

  //       // nextPosition[response.board][response.lastMove] = opponentSymbol;
  //       // console.log(`nextPosition[${response.board}][${response.lastMove}]`);
  //       // setGamePosition(nextPosition);
  //       // setLastMove(response.lastMove);
  //       let nextPosition = structuredClone(gamePosition);

  //       nextPosition[response.board][response.lastMove] = opponentSymbol;
    
  //       setGamePosition(nextPosition);
  //       setLastMove(response.lastMove);
  //       setCurrentTurn(xNext ? "O" : "X"); // Устанавливаем текущий ход после обновления игровой позиции
  //       // setMovesHistory([...movesHistory, { board, position }]);
        
  //       // console.log(`movesHistory: ${movesHistory}`);
  //       setBoardPosition(position);
  //       setBoardTurn(board);
  //       // updateGame(response.board, response.position, opponentSymbol === currentTurn);

  //       console.log("updateForOponent");
  //     } 
  //   };
  // }

  if (typeof overallWinner === "object") {
    status =
      "Congratulations! Player " +
      overallWinner[0] +
      " won. Would you like to play again?";
  } else if (overallWinner === "draw") {
    status =
      "No more legal moves. The game is a draw. Would you like to play again?";
  }

  let rows = [];
  for (let i = 0; i < 3; i++) {
    let boardArray = [];
    for (let j = 0; j < 3; j++) {
      let k = i * 3 + j;
      let boardState = boardsFinished[k];
      if (typeof overallWinner === "object") {
        if (overallWinner.includes(k)) {
          boardState = "winning line";
        }
      } else if (boardState === null && currentGame[k]) {
        boardState = "current";
      }

      let children = [
        <SmallBoard
          updateGame={updateGame}
          thisBoard={k}
          squares={gamePosition[k]}
          boardState={boardState}
          key={k + "SmallBoard"}
        />
      ];
      if (boardsFinished[k] && boardsFinished[k] !== "draw") {
        children.push(
          <div className="bigScore" key={k + "bigScore"}>
            <img src={boardsFinished[k]} style={{width: '100%', height: '100%'}}/>
          </div>
        );
      }
      boardArray.push(<td key={k + "cell"}>{children}</td>);
    }
    rows.push(<tr key={i + "row"}>{boardArray}</tr>);
  }

  return (
    <>
      <div className="status">{status}</div>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

export default BigBoard;
