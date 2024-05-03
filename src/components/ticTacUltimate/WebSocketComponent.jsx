import React, { useState, useEffect } from "react";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import StandbyScreen from "./StandbyScreen";
import { BigBoardGame } from "../../panels/BigBoardGame/BigBoardGame";

const WebSocketComponent = ({
  panelHeaderText,
  robot,
  appStatus,
  clientId,
  currentBack,
}) => {
  const routeNavigator = useRouteNavigator();

  const [ws, setWs] = useState(null);
  const [isOpponentFound, setIsOpponentFound] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const [turnNext, setTurnNext] = useState(null);
  // http://127.0.0.1:8000
  // wss://tictactoevkminiappwebsocket.onrender.com
  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${clientId}/0`);
    setWs(socket);

    return () => {
      socket.close();
    };
  }, [clientId]);

  useEffect(() => {
    if (!ws) return;

    // console.log("kajsdhfiuasnviavouiewrnkldjansoinanvpewunpuroi");
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
      routeNavigator.push("/");
    };

    return () => {
      ws.close();
      routeNavigator.push("/");
    };
  }, [ws]);

  return (
    <div>
      {isOpponentFound ? (
        // <>
        //   <div className="big-board-game">
        //     <BigBoard
        //       robot={robot}
        //       appStatus={appStatus}
        //       playerIsX={symbol === 'X'}
        //       socket={ws}
        //       turnNext={turnNext}
        //     />
        //   </div>
        // </>
        <BigBoardGame
          panelHeaderText={panelHeaderText}
          socket={ws}
          robot={robot}
          appStatus={appStatus}
          playerIsX={symbol === "X"}
          turnNext={turnNext}
          currentBack={currentBack}
        />
      ) : (
        <StandbyScreen />
      )}
    </div>
  );
};

export default WebSocketComponent;
