import { useState, useEffect } from "react";
import { calculateWinner, findBoardsWon } from "./CalculateWinner";
import SmallBoard from "./SmallBoard";
import { minMaxMove } from "../../AI/Ai";

import tic from '../../assets/tic.svg';
import tac from '../../assets/tac.svg';

const BigBoard = ({ socket, robot, appStatus, playerIsX }) => {
  
  const [ticPlayerScore, setTicPlayerScore] = useState(0);
  const [tacPlayerScore, setTacPlayerScore] = useState(0);

  const [haveWinner, setHaveWinner] = useState(false);

  let initalPosition = [];
  for (let i = 0; i < 9; i++) {
    initalPosition.push(Array(9).fill(null));
  }
  const [gamePosition, setGamePosition] = useState(initalPosition);
  const [lastMove, setLastMove] = useState(null);
  
  const opponentSymbol = playerIsX ? tac : tic;
  const mySymbol = !playerIsX ? tac : tic;

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
  
    console.log(`${currentPlayer} made a move nextPosition[${board}][${position}]`);

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

            return nextPosition;
          });
        } 
      };
    }
  }, [socket]);

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

  useEffect(() => {
    if (typeof overallWinner === "object") {
      setHaveWinner(true);
      if (xNext){
        setTacPlayerScore(tacPlayerScore + 1);
      } else {
        setTicPlayerScore(ticPlayerScore + 1);
      }
    } 
      // else if (overallWinner === "draw") {
      //   status =
      //     "No more legal moves. The game is a draw. Would you like to play again?";
      // }
  }, [xNext])
  

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

  const PlayAgain = () => {
    if (haveWinner && (appStatus === "localGame" || appStatus === "aiGame")) {
      moveCount = 0;

      setGamePosition(initalPosition);
      setLastMove(null);
      setHaveWinner(false);
    }
  }

  return (
    <div 
      onClick={() => PlayAgain()}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        height: '100vh', 
        justifyContent: 'center' 
      }} >
      {/* <div className="status">{status}</div> */}

      <div className="info">
        <div className={`sides ${xNext ? 'active' : ''}`}>
          <img src={tic} className='tic' alt="tic" />
        </div>

        <h1 className="score">
          <div> {ticPlayerScore}</div> <div> : </div> <div> {tacPlayerScore} </div>
        </h1>

        <div className={`sides ${!xNext ? 'active' : ''}`}>
          <img src={tac} className='tac' alt="tac" />
        </div>
      </div>

      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default BigBoard;
