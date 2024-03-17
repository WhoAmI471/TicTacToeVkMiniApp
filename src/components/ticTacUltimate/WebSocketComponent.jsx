import React, { useState, useEffect } from "react";
import BigBoard from "./BigBoard";
import StandbyScreen from "./StandbyScreen";

const WebSocketComponent = ({ robot, appStatus, clientId }) => {
  const [ws, setWs] = useState(null);
  const [isOpponentFound, setIsOpponentFound] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const [turnNext, setTurnNext] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(`wss://tictactoevkminiappwebsocket.onrender.com/ws/${clientId}`);
    setWs(socket);

    return () => {
      socket.close();
    };
  }, [clientId]);

  useEffect(() => {
    if (!ws) return;
  
    console.log("kajsdhfiuasnviavouiewrnkldjansoinanvpewunpuroi");
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
  
      console.log(response);
  
      if (response.method === "join") {
        setIsOpponentFound(true);
        setSymbol(response.symbol);
        setTurnNext(response.turn);
        console.log("join");
      }
    };
  
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
  
    return () => {
      ws.close();
    };
  }, [ws]);

  return (
    <div>
      {isOpponentFound ? (
        <>
          <BigBoard
            robot={robot}
            appStatus={appStatus}
            playerIsX={symbol === 'X'}
            socket={ws}
            turnNext={turnNext}
          />
        </>
      ) : (
        <StandbyScreen />
      )}
    </div>
  );
};

export default WebSocketComponent;
