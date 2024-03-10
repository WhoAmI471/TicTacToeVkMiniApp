import React, { useState, useEffect } from "react";
import { calculateWinner, findBoardsWon } from "./CalculateWinner";
import SmallBoard from "./Smallboard";
import { minMaxMove } from "../../AI/Ai";
import tic from '../../assets/tic.svg'
import tac from '../../assets/tac.svg'

const OnlineGame = ({ socket }) => {
  const [gamePosition, setGamePosition] = useState(Array(9).fill(Array(9).fill(null)));
  const [lastMove, setLastMove] = useState(null);
  const [isPlayerX, setIsPlayerX] = useState(false); // Flag to indicate if current player is X

  useEffect(() => {
    socket.on("move", ({ board, position }) => {
      const nextPosition = gamePosition.map((row, index) => {
        return index === board ? row.map((val, i) => (i === position ? (isPlayerX ? tic : tac) : val)) : row;
      });
      setGamePosition(nextPosition);
      setLastMove(position);
      setIsPlayerX(!isPlayerX); // Switch player after opponent's move
    });

    return () => {
      socket.off("move");
    };
  }, [gamePosition, socket, isPlayerX]);

  const handleSquareClick = (board, position) => {
    if (!gamePosition[board][position]) {
      if (isPlayerX) {
        socket.emit("move", { board, position });
        setIsPlayerX(false); // Switch to opponent's turn after player's move
      }
    }
  };

  const boardsFinished = findBoardsWon(gamePosition);
  const overallWinner = calculateWinner(boardsFinished);

  // Rest of the code for rendering game UI, similar to your BigBoard component
};

export default OnlineGame;
