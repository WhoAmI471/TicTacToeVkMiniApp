import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, ModalRoot, ModalCard, Group, Button } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from './routes';

import { Home } from './panels/Home/Home';
import { NetworkMenu } from './panels/NetworkMenu/NetworkMenu';
import { HostMenu } from './panels/HostMenu/HostMenu';
import { JoinMenu } from './panels/JoinMenu/JoinMenu';
import { SmallBoardGame } from './panels/SmallBoardGame/SmallBoardGame';

import BigBoard from "./components/ticTacUltimate/BigBoard";
import WebSocketComponent from "./components/ticTacUltimate/WebSocketComponent";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.WELCOME_MENU } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);


  const [reset, setReset] = useState(0);
  const [robot, setRobot] = useState(2);
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("home");
  const [playerIsX, setPlayerIsX] = useState(true);
  const [clientId, setClientId] = useState(null); // Добавляем состояние для client_id

  const [botActive, setBotActive] = useState(0);
  const [botLevel, setBotLevel] = useState(2);
  const [boardSize, setBoardSize] = useState(2);

  function resetBoard() {
    setReset(reset + 1);
  }

  function statusUpdate(newStatus) {
    setStatus(newStatus);
  }

  function togglePlayerisX() {
    setPlayerIsX(!playerIsX);
  }

  function robotMenuClick(robotLevel) {
    setRobot(robotLevel);
    setStatus("aiGame");
  }

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (fetchedUser){
      console.log(fetchedUser);
      setClientId(fetchedUser.id);
      // setClientId(Date.now());
    }
  }, [fetchedUser])

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home 
            id="home" 
            setStatus={statusUpdate}
            setBotActive={setBotActive}
            setBotLevel={setBotLevel}
            setBoardSize={setBoardSize}
            robotMenuClick={robotMenuClick}
          />
          <SmallBoardGame 
            id="smallBoard" 
            botActive={botActive}
            botLevel={botLevel}
            boardSize={boardSize}
          />
          <BigBoard
            id="bigBoard"
            socket={socket}
            robot={robot}
            key={reset}
            appStatus={status}
            playerIsX={playerIsX}
          />
          <WebSocketComponent
            id="OnlineBigBoard"
            robot={robot}
            appStatus={status}
            clientId={clientId}
          />
          <NetworkMenu id="networkMenu" setStatus={statusUpdate} />
          <HostMenu 
            id="hostMenu"
            togglePlayerisX={togglePlayerisX}
            playerIsX={playerIsX}
            socket={socket}
            setSocket={setSocket}
          />
          <JoinMenu 
            id="joinMenu"
            setStatus={statusUpdate}
            socket={socket}
            setSocket={setSocket}
          />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
